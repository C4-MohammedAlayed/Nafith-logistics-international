const express = require("express");

const {createUsers,getAllUsers,updateUserById}=require("../controllers/users")

//Create usersRouter
const usersRouter = express.Router();

usersRouter.post("/",createUsers);
usersRouter.get("/",getAllUsers);
usersRouter.put("/:id",updateUserById)
module.exports = usersRouter;
