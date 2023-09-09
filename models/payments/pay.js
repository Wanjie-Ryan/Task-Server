const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  transactedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
  },
});

module.exports = mongoose.model("payment", PaymentSchema);
