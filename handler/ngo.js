const ngoModel = require("../model/ngo");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../config/mailer");
const { validateNGO } = require("../config/validate");
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

const registerNgo = async (req, res) => {
  try {
    const {
      organisationName,
      email,
      telephone,
      password,
      description,
      website,
    } = req.body;

    const { error } = validateNGO(req.body);

    if (error) {
      res.status(400).json({
        message: error.details[0].message,
      });
    } else {
      const findNgo = await ngoModel.findOne({ email: email });

      if (findNgo) {
        res.status(409).json({
          message: "NGO with this email already exist",
        });
      } else {
        const salt = await bcrypt.genSalt(16);
        const hashed = await bcrypt.hash(password, salt);

        const token = crypto.randomBytes(16).toString("hex");
        const Ngo = await ngoModel.create({
          organisationName,
          email,
          telephone,
          description,
          website,
          password: hashed,
        });

        const verifyLink = `http://localhost:2000/api/Ngo/${Ngo._id}/verify/${token}`;

        const message = {
          from: "nelsonelaye@gmail.com",
          to: email,
          subject: "Email verification",
          html: `<p>Confirm your account by clicking the link below</p>
          <p><a href=${verifyLink}>Click here to continue</a></p>
          <p>You are receiving this mail because you signed up on our platform, <b>Ngo Africa Network</b>. Ignore this message if you did not take this action.</p>
          `,
        };
        await transporter.sendMail(message, (err, info) => {
          if (err) {
            console.log(err);
          } else {
            console.log(info);
          }
        });

        res.status(201).json({
          message: "Please check your inbox/spam to confirm your account.",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const verifyNgo = async (req, res) => {
  try {
    const id = req.params.ngoId;
    const Ngo = await ngoModel.findById(id);

    if (!Ngo) {
      res.status(404).json({
        message: "Organisation not found. Check your details and try again ",
      });
    } else {
      const updateNgo = await ngoModel.findByIdAndUpdate(
        Ngo._id,
        {
          isVerify: true,
        },
        { new: true }
      );

      res.status(200).json({
        message: "Verification complete. Proceed to login.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const loginNgo = async (req, res) => {
  try {
    const { email, password } = req.body;

    const Ngo = await ngoModel.findOne({ email: email });

    if (Ngo) {
      if (Ngo.isVerify === true) {
        const correctPass = await bcrypt.compare(password, Ngo.password);
        if (correctPass) {
          const { password, ...restData } = Ngo._doc;
          const accessToken = jwt.sign(
            {
              _id: Ngo._id,
              logo: Ngo.logo,
              organisation: Ngo.organisation,
              email: Ngo.email,
              telephone: Ngo.telephone,
              description: Ngo.description,
              website: Ngo.website,
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
        res.status(400).json({
          message:
            "Ngo not verified. Check your inbox/spam folder for verification link.",
        });
      }
    } else {
      res.status(404).json({
        message: "Ngo not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateNgo = async (req, res) => {
  try {
    const Ngo = await ngoModel.findById(req.params.ngoId);
    if (Ngo) {
      const ngoUpdate = await ngoModel.findByIdAndUpdate(
        req.params.ngoId,
        req.body,
        { new: true }
      );

      res.status(200).json({
        data: ngoUpdate,
      });
    } else {
      res.status(404).json({
        message: "Ngo not found",
      });
    }
  } catch {
    res.status(500).json({
      message: error.message,
    });
  }
};

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
  registerNgo,
  verifyNgo,
  loginNgo,
  updateNgo,
  deleteNgo,
};
