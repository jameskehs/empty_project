const express = require("express");
const usersRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, getUserByEmail } = require("../db/users");

usersRouter.post("/register", async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await createUser(firstName, lastName, email, hashedPass);
    const token = jwt.sign({ userid: newUser.userid }, process.env.JWT_SECRET);
    res.json({ msg: "New User Created!", newUser, token });
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
      res.status(401).json("Invalid Credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = await jwt.sign({ userid: user.userid }, process.env.JWT_SECRET);
      res.json({ msg: "Successful sign in", token });
    } else {
      res.status(401).json("Invalid Credentials");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
