const { model, Schema } = require("mongoose");

const otpSchema = new Schema(
  {
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    otp: {
      type: String,
      required: true,
      trim: true,
    },
    isUsed : {
        type : Boolean,
        required: true,
        default: false,
    }
  },
  { timestamps: true }
);

module.exports = model("Otp", otpSchema);