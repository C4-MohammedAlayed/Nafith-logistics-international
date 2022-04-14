const express = require("express");

const {
  createUsers,
  getAllUsers,
  updateUserById,
  deleteUserById,
} = require("../controllers/users");

//Create usersRouter
const usersRouter = express.Router();

usersRouter.post("/", createUsers);
usersRouter.get("/", getAllUsers);
usersRouter.put("/:id", updateUserById);
usersRouter.delete("/:id", deleteUserById);
module.exports = usersRouter;
