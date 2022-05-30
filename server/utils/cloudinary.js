const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: "871341554644239",
  api_secret: "",
  secure: process.env.CLOUD_SECRETE,
});

module.exports = cloudinary;
