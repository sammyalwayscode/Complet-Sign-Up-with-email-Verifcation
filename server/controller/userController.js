const userModel = require("../model/userModel");
const verifyModel = require("../model/verifyModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinary");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const transport = nodemailer.createTransport({
  service: process.env.SERVICE,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

const getAllUsers = async (req, res) => {
  try {
    const getAll = await userModel.find();
    res.status(200).json({
      status: 200,
      data: getAll,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error.message,
    });
  }
};

const getOneUsers = async (req, res) => {
  try {
    const getOne = await userModel.findById(req.parmas.id);
    res.status(200).json({
      status: 200,
      data: getOne,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const delUser = await userModel.findByIdAndDelete(req.parmas.id);
    res.status(200).json({
      status: 200,
      data: delUser,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { email, userName, password } = req.body;
    const salt = await bcrypt.genSalt(process.env.SALT);
    const hashed = await bcrypt.hash(password, salt);

    const image = await cloudinary.uploader.upload(req.file.path);

    const user = await userModel.create({
      email,
      userName,
      password: hashed,
      avatar: image.secure_url,
      avatarID: image.public_id,
    });

    const dataToken = crypto.randomBytes(7).toString("hex");
    console.log(dataToken);
    const token = jwt.sign({ dataToken }, process.env.SECRET, {
      expiresIn: process.env.MINUTE,
    });

    const mailOptions = {
      from: "no-reply@gmail.com",
      to: email,
      subject: "Account Verification",
      html: `
            <h3>
                This is to verify your account, please click on the <a href="http://localhost:7080/api/user/${user._id}/${token}" >LINK</a> to continue. This link expires in 20 minutes
            </h3>
            `,
    };

    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Failed to send", error);
      } else {
        console.log("Mail Sent", info.response);
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error.message,
    });
  }
};

module.exports = { getAllUsers, getOneUsers, deleteUser, createUser };
