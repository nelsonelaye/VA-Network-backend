const mongoose = require("mongoose");

const ngoSchema = mongoose.Schema(
  {
    logo: {
      type: String,
    },
    logoId: {
      type: String,
    },
    organisationName: {
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
    description: {
      type: String,
    },
    website: {
      type: String,
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "projects",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ngos", ngoSchema);
