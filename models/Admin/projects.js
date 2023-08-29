const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: [true, "name of project must be provided"],
    },

    deadline: {
      type: Date,
      required: [true, "deadline date must be provided"],
    },

    description: {
      type: String,
      required: [true, "project description must be provided"],
    },

    status: {
      type: String,
      enum: ["pending", "complete"],
      default: "Pending",
      required: [true, "Status of Project is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Projects", projectSchema);
