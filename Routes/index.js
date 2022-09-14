const express = require("express");
const LayoutsRouter = require("./LayoutsRouter");
const usersRouter = require("./UsersRouter");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");
const modulesRouter = require("./ModulesRouter");

apiRouter.use(async (req, res, next) => {
  try {
    const prefix = "Bearer ";
    const auth = req.header("Authorization");
    if (!auth) {
      next();
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
      const user = jwt.verify(token, process.env.JWT_SECRET);
      if (user) {
        req.user = user;
        next();
      }
    } else {
      next({
        name: "Header Error",
        message: "Authorization must start with 'Bearer'",
      });
    }
  } catch (err) {
    next(err);
  }
});

apiRouter.use("/users", usersRouter);
apiRouter.use("/layouts", LayoutsRouter);
apiRouter.use("/modules", modulesRouter);

module.exports = apiRouter;
