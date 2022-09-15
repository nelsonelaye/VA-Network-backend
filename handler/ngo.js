const ngoModel = require("../model/ngo");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getAllNgos = async (req, res) => {
  try {
    const ngos = await ngoModel.find();
    res.status(200).json({
      data: ngos,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getOneNgo = async (req, res) => {
  try {
    const ngo = await ngoModel.findById(req.params.ngoId);
    res.status(200).json({
      data: ngo,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const register = {};

const deleteNgo = async (req, res) => {
  try {
    const id = req.params.ngoId;

    if (id) {
      await ngoModel.findByIdAndDelete(id);
      res.status(204).json({
        message: "NGO successfully deleted",
      });
    } else {
      res.status(404).json({
        message: "NGO not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getOneNgo,
  getAllNgos,
};
