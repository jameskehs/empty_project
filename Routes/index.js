const express = require("express");
const LayoutsRouter = require("./LayoutsRouter");
const usersRouter = require("./UsersRouter");
const apiRouter = express.Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/layouts", LayoutsRouter);

module.exports = apiRouter;
