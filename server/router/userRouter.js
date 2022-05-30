const upload = require("../utils/multer");
const express = require("express");
const {
  getAllUsers,
  getOneUsers,
  deleteUser,
  createUser,
} = require("../controller/userController");
const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/:id").get(getOneUsers).delete(deleteUser);
router.route("/register").post(upload, createUser);

module.exports = router;
