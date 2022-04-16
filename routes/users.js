const express = require("express");

const {
  createUsers,
  getAllUsers,
  updateUserById,
  deleteUserById,
  getUserByName,
} = require("../controllers/users");

//Create usersRouter
const usersRouter = express.Router();

usersRouter.post("/", createUsers);
usersRouter.get("/", getAllUsers);
usersRouter.get("/search", getUserByName);
usersRouter.put("/:id", updateUserById);
usersRouter.delete("/:id", deleteUserById);
module.exports = usersRouter;
