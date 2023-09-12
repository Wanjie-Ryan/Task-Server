const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  Message: {
    type: String,
    required: true,
  },
  Success: {
    type: String,
    required: true,
  },
  Status: {
    type: Number,
    required: true,
  },
  Amount: {
    type: Number,
    required: true,
  },
  transaction_code: {
    type: String,
    required: true,
  },
  transaction_reference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("payment", PaymentSchema);
