const mongoose = require("mongoose");
const MONGODB_URI = process.env.URI;

mongoose.connect(MONGODB_URI);
mongoose.connection
  .on("open", () => {
    console.log("Connected to DataBase");
  })
  .once("error", () => {
    console.log("Failed to connect to DataBase");
  });

module.exports = mongoose;
