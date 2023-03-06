const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const {
  Types: { ObjectId },
} = require("mongoose");

//model
const Voucher = require("../models/voucherModel");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { voucherType } = req.query;
    const vouchers = await Voucher.find({
      category: ObjectId(voucherType),
    }).populate("category");

    const modifiedVouchers = vouchers.map(
      ({ _id, pin, serial, active, category }) => {
        return {
          _id,
          pin,
          serial,
          active,
          voucher: category.voucherType,
        };
      }
    );
 

    res.status(200).json(modifiedVouchers);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const newVouchers = req.body;

    const vouchers = await Voucher.insertMany(newVouchers);
    if (!vouchers) {
      res.status(404).json("Error saving pins.Please try again later");
    }
    res.sendStatus(201);
  })
);


router.delete(
  "/",
  asyncHandler(async (req, res) => {
    const newVouchers = req.body;

    const vouchers = await Voucher.insertMany(newVouchers);
    if (!vouchers) {
      res.status(404).json("Error saving pins.Please try again later");
    }
    res.sendStatus(201);
  })
);

module.exports = router;
