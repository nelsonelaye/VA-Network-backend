const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
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
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
