const express = require("express");

const {createUsers}=require("../controllers/users")

//Create usersRouter
const usersRouter = express.Router();

usersRouter.post("/",createUsers);

module.exports = usersRouter;
