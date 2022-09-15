const volunteerModel = require("../model/volunteer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateVolunteer } = require("../config/validate");
require("dotenv").config();
const transporter = require("../config/mailer");
const sender = require("../config/oauth");
const { google } = require("googleapis");
const crypto = require("crypto");

const getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await volunteerModel.find();
    res.status(200).json({
      data: volunteers,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getOneVolunteer = async (req, res) => {
  try {
    const volunteer = await volunteerModel.findById(req.params.volunteerId);
    res.status(200).json({
      data: volunteer,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      telephone,
      password,
      bio,
      interests,
      DOB,
    } = req.body;

    const { error } = validateVolunteer(req.body);

    if (error) {
      res.status(400).json({
        message: error.details[0].message,
      });
    } else {
      const findvolunteer = await volunteerModel.findOne({ email: email });

      if (findvolunteer) {
        res.status(409).json({
          message: "volunteer with this email already exist",
        });
      } else {
        const salt = await bcrypt.genSalt(16);
        const hashed = await bcrypt.hash(password, salt);

        const token = crypto.randomBytes(16).toString("hex");
        // const volunteer = await volunteerModel.create({
        //   firstName,
        //   lastName,
        //   email,
        //   telephone,
        //   password: hashed,
        //   bio,
        //   interests,
        //   DOB,
        // });

        const message = {
          from: "nelsonelaye@gmail.com",
          to: email,
          subject: "Email verification",
          text: "Please verify your email",
        };
        await transporter.sendMail(message, (err, info) => {
          if (err) {
            console.log(err);
          } else {
            console.log(info);
          }
        });

        // const verifyLink = `http://localhost:2000/api/volunteer/${volunteer._id}/verify/${token}`;
      }
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const verifyVolunteer = async (req, res) => {
  try {
    const id = req.params.volunteerId;
    const volunteer = await volunteerModel.findById(id);

    if (!volunteer) {
      res.status(404).json({
        message: "user does not exist. Create an account to continue",
      });
    } else {
      const updateVolunteer = await volunteerModel.findByIdAndUpdate(
        volunteer._id,
        {
          isVerify: true,
        },
        { new: true }
      );

      res.status(200).json({
        message: "Volunteer verification complete",
        data: updateVolunteer,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const volunteer = await volunteerModel.findOne({ email: email });

    if (volunteer) {
      const correctPass = await bcrypt.compare(password, volunteer.password);

      if (correctPass) {
        const { password, ...restData } = volunteer._doc;
        const accessToken = jwt.sign(
          {
            _id: volunteer._id,
            firstName: volunteer.firstName,
            lastName: volunteer.lastName,
            email: volunteer.email,
            telephone: volunteer.telephone,
            DOB: volunteer.DOB,
            bio: volunteer.bio,
          },
          process.env.SECRET,
          { expiresIn: "1d" }
        );

        res.status(200).json({
          data: { accessToken, ...restData },
        });
      } else {
        res.status(400).json({
          message: "password is incorrect",
        });
      }
    } else {
      res.status(404).json({
        message: "volunteer not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateVolunteer = async (req, res) => {
  try {
    const volunteer = await volunteerModel.findById(req.params.volunteerId);
    if (volunteer) {
      const volunteerUpdate = await volunteerModel.findByIdAndUpdate(
        req.params.volunteerId,
        req.body,
        { new: true }
      );

      res.status(200).json({
        data: volunteerUpdate,
      });
    } else {
      res.status(404).json({
        message: "volunteer not found",
      });
    }
  } catch {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteVolunteer = async (req, res) => {
  try {
    const volunteer = await volunteerModel.findById(req.params.volunteerId);
    if (volunteer) {
      await volunteerModel.findByIdAndDelete(req.params.volunteerId);
      res.status(204).json({
        message: "volunteer successfully deleted",
      });
    } else {
      res.status(404).json({
        message: "volunteer not found",
      });
    }
  } catch {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteAll = async (req, res) => {
  try {
    await volunteerModel.deleteMany();

    res.status(204).json({
      message: "all volunteers deleted",
    });
  } catch {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllVolunteers,
  getOneVolunteer,
  register,
  login,
  updateVolunteer,
  deleteVolunteer,
  deleteAll,
};
