const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    image: {
      type: String,
    },
    imageId: {
      type: String,
    },
    title: {
      type: String,
    },

    description: {
      type: String,
    },
    applicationPageLink: {
      type: String,
    },
    ngo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ngos",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("projects", projectSchema);
