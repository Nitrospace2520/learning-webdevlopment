const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} = require("../controllers/userControllers");

//? routes:=
router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUser).delete(deleteUser).patch(updateUser);

module.exports = router;
