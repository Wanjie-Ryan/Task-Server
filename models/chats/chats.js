const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  sentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: [true, "must provide some content"],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  timeSent: {
    type: String,
    required: [true, "must provide the time message was sent"],
  },
});

module.exports = mongoose.model("chat", chatSchema);
