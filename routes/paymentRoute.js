const router = require("express").Router();
const crypto = require("crypto");
const fs = require("fs");
const _ = require("lodash");
const moment = require("moment");
const {
  Types: { ObjectId },
} = require("mongoose");
const asyncHandler = require("express-async-handler");
const Voucher = require("../models/voucherModel");
const Transaction = require("../models/transactionModel");
const { requestPayment } = require("../api/transaction");
const generateQRCode = require("../config/qrcode");
const currencyFormatter = require("../config/currencyFormatter");

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const {
      category,
      totalAmount,
      categoryType,
      quantity,
      agentName,
      agentPhoneNumber,
      agentEmail,
    } = req.body;

    const voucher = await Voucher.find({
      category: ObjectId(categoryType?.id),
      active: true,
    })
      .populate("category")
      .limit(quantity);
    //  console.log(voucher);

    if (_.isEmpty(voucher)) {
      // return res
      //   .status(404)
      //   .json("Error processing your request.Please try again later");
      return res
        .status(404)
        .json(
          "Requested voucher is currently not available.Please try again later!!!"
        );
    }
    console.log("vou cat");
    console.log(voucher[0]?.category);

    let transactionInfo = {};

    if (["waec", "university", "security"].includes(category)) {
      const modifiedVoucher = voucher.map(({ category, serial, pin, _id }) => {
        return {
          id: _id,
          voucherType: category.voucherType,
          formType: category?.details?.formType || "",
          price: currencyFormatter(category.price),
          serial,
          pin,
        };
      });

      transactionInfo = {
        info: {
          transaction_id: crypto.randomUUID(),
          amount: totalAmount,
          agentName,
          agentPhoneNumber,
          agentEmail,
          dataURL: voucher[0]?.category?.details?.voucherURL,
          voucherCategory: category,
        },
        vouchers: modifiedVoucher,
      };
    }

    if (["bus", "cinema", "stadium"].includes(category)) {
      const stadiumCategory = category;
      await Promise.all(
        voucher.map(async ({ category, serial, pin, _id }) => {
          const code = await generateQRCode(pin || serial);
          return {
            id: _id,
            voucherType: category.voucherType,
            price:
              stadiumCategory === "stadium"
                ? currencyFormatter(categoryType?.price)
                : currencyFormatter(category.price),
            stand: categoryType?.stand || "",
            serial,
            pin,
            qrCode: code,
          };
        })
      ).then((vouchers) => {
        if (category === "bus") {
          transactionInfo = {
            info: {
              transaction_id: crypto.randomUUID(),
              amount: totalAmount,
              agentPhoneNumber,
              agentEmail,
              voucherCategory: category,
              origin: voucher[0].category?.details?.origin?.city,
              destination: voucher[0].category?.details?.destination?.city,
              date: moment(new Date(voucher[0].category?.details?.date)).format(
                "dddd,Do MMMM YYYY"
              ),
              time: moment(new Date(voucher[0].category?.details?.time)).format(
                "hh:mm a"
              ),
            },
            vouchers: vouchers,
          };
          return;
        }

        if (category === "cinema") {
          transactionInfo = {
            info: {
              transaction_id: crypto.randomUUID(),
              amount: totalAmount,
              agentPhoneNumber,
              agentEmail,
              voucherCategory: category,
              movie: voucher[0].category?.details?.movie,
              theatre: voucher[0].category?.details?.theatre,
              location: voucher[0].category?.details?.location,
              date: moment(new Date(voucher[0].category?.details?.date)).format(
                "dddd,Do MMMM YYYY"
              ),
              time: moment(new Date(voucher[0].category?.details?.time)).format(
                "hh:mm a"
              ),
            },
            vouchers: vouchers,
          };

          return;
        }
        if (category === "stadium") {
          transactionInfo = {
            info: {
              transaction_id: crypto.randomUUID(),
              amount: totalAmount,
              agentPhoneNumber,
              agentEmail,
              voucherCategory: category,
              matchType: voucher[0].category?.details?.matchType,
              home: voucher[0].category?.details?.home,
              away: voucher[0].category?.details?.away,
              venue: voucher[0].category?.details?.venue,
              date: moment(new Date(voucher[0].category?.details?.date)).format(
                "dddd,Do MMMM YYYY"
              ),
              time: moment(new Date(voucher[0].category?.details?.time)).format(
                "hh:mm a"
              ),
            },
            vouchers: vouchers,
          };

          return;
        }
      });
    }

    // const data = await requestPayment(agentPhoneNumber);
    console.log(transactionInfo);

    const transaction = await Transaction.create(transactionInfo);

    if (_.isEmpty(transaction)) {
      return res
        .status(400)
        .json("Error processing your request.Please try again");
    }

    res.status(200).json(transaction);
  })
);

// router.get(
//   "/generate-pdf",
//   asyncHandler(async (req, res) => {
//     // const { transactionId } = req.body;

//     await generateVoucher(g);

//     res.sendStatus(200);
//   })
// );

module.exports = router;
