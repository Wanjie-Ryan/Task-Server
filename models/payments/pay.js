const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  Message: {
    type: String,
    required: true,
  },
  Success: {
    type: Boolean,
    required: true,
  },
  Status: {
    type: Number,
    required: true,
  },
  Amount: {
    type: String,
    
  },
  transaction_reference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  transaction_code: {
    type: String,
    
  },
},{ timestamps: true });

module.exports = mongoose.model("payment", PaymentSchema);
