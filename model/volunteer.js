const mongoose = require("mongoose");

const volunteerSchema = mongoose.Schema(
  {
    avatar: {
      type: String,
    },
    avatarId: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },

    telephone: {
      type: Number,
    },
    password: {
      type: String,
    },
    bio: {
      type: String,
    },
    DOB: {
      type: String,
    },
    interests: {
      type: [String],
    },
    isVerify: {
      type: Boolean,
      default: false,
    },
    testimonials: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "testimonials",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("volunteers", volunteerSchema);
