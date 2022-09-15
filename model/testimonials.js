const mongoose = require("mongoose");

const testimonialSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "volunteers",
    },

    message: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("testimonials", testimonialSchema);
