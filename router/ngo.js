const express = require("express");
const router = express.Router();
const { getOneNgo, getAllNgos } = require("../handler/ngo");

router.route("/ngo").get(getAllNgos);
router.route("/ngo/:ngoId").get(getOneNgo);

module.exports = router;
