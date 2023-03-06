const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const moment = require("moment");
const sendMail = require("../config/mail");
const generateVoucher = require("../config/generatePDF");
const generateVoucherTemplate = require("../config/generateVoucherTemplate");
//model
const Transaction = require("../models/transactionModel");
const Voucher = require("../models/voucherModel");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const transaction = await Transaction.find();
    res.status(200).json(transaction);
  })
);

router.post(
  "/send-mail",
  asyncHandler(async (req, res) => {
    const id = req.body.id;

    const transaction = await Transaction.findById(id);

    transaction._doc.info.formattedDate = moment(transaction.createdAt).format(
      "dddd,Do MMMM YYYY"
    );

    transaction._doc.info.formattedTime = moment(transaction.createdAt).format(
      "h:mm a"
    );

    if (_.isEmpty(transaction)) {
      return res
        .status(404)
        .json("Error processing your request.Please try again later");
    }

    //Check if voucher pdf already exists
    if (fs.existsSync(path.join(process.cwd(), "/vouchers/", `${id}.pdf`))) {
      // await sendMail(id, transaction?.info?.agentEmail);
      if (process.env.NODE_ENV === "production") {
        await sendMail(id, transaction?.info?.agentEmail);
      }
    } else {
      //Generate new voucher template
      const template = await generateVoucherTemplate(transaction);

      //Print  voucher template in pdf
      await generateVoucher(template, id);

      //

      // await sendMail(id, transaction?.info?.agentEmail);

      if (process.env.NODE_ENV === "production") {
        const mailResult = await sendMail(id, transaction?.info?.agentEmail);
      }
    }
    const soldVouchers_ids = _.map(transaction.vouchers, "id");
    const soldVouchers = await Voucher.updateMany(
      {
        _id: { $in: soldVouchers_ids },
      },
      {
        $set: {
          active: false,
        },
      },
      {
        multi: true,
        new: true,
      }
    );

    res.status(200).send(id);
  })
);

router.get(
  "/:transactionId",
  asyncHandler(async (req, res) => {
    const transactionId = req.params.transactionId;
    const transaction = await Transaction.findById(transactionId);
    res.status(200).json(transaction);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const newTransaction = req.body;

    const transaction = await Transaction.create(newTransaction);
    if (!transaction) {
      res.status(404).json("Error saving pins.Please try again later");
    }
    res.sendStatus(201);
  })
);

module.exports = router;
