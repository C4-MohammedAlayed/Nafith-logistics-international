const express = require("express");

const {createUsers,getAllUsers}=require("../controllers/users")

//Create usersRouter
const usersRouter = express.Router();

usersRouter.post("/",createUsers);
usersRouter.get("/",getAllUsers);

module.exports = usersRouter;
