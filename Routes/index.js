const express = require("express");
const usersRouter = require("./UsersRouter");
const apiRouter = express.Router();

apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
