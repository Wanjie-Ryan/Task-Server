const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
    },

    name: {
      type: String,
      required: [true, "name of user is required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],

      validate: [validator.isEmail, "Please provide a valid email"],
    },

    contact: {
      type: String,
      required: [true, "contact of user is required"],
      unique: true,
      match: [
        /^\+\d{12}$/,
        "Please provide a valid telephone number with + and country code",
      ],
    },

    company: {
      type: String,
      required: [true, "company of user is required"],
    },

    role: {
      type: String,
      enum: ["Member", "Admin"],
      default: "Member",
      required: [true, "Role of user is required"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 5,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.checkpwd = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

module.exports = mongoose.model("User", userSchema);
