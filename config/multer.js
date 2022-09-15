const multer = require("multer");

const avatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../avatars");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const logoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../logos");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const avatarUpload = multer({ storage: avatarStorage }).single("avatar");
const logoUpload = multer({ storage: logoStorage }).single("logo");
const imageUpload = multer({ storage: imageStorage }).single("image");

module.exports = {
  avatarUpload,
  logoUpload,
  imageUpload,
};
