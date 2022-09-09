const express = require("express");
const usersRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, getUserByEmail, getAllUsers } = require("../db/users");

usersRouter.post("/register", async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await createUser(firstName, lastName, email, hashedPass);
    const token = jwt.sign({ userid: newUser.userid, superuser: newUser.superuser }, process.env.JWT_SECRET);
    console.log(token);
    res.json({ msg: "New User Created!", newUser, token });
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    console.log(user);
    if (!user) {
      res.status(401).json("Invalid Credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ userid: user.userid, superuser: user.superuser }, process.env.JWT_SECRET);
      console.log(token);
      res.json({ msg: "Successful sign in", token });
    } else {
      res.status(401).json("Invalid Credentials");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

usersRouter.get("/all", async (req, res, next) => {
  try {
    const allUsers = await getAllUsers();
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
