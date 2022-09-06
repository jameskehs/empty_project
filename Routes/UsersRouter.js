const express = require("express");
const { getAllUsers, createUser, deleteUser, updateUser } = require("../db");
const usersRouter = express.Router();

usersRouter.get("/all", async (req, res, next) => {
  try {
    const allUsers = await getAllUsers();
    res.send(allUsers);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const newUser = await createUser(username, password);
    res.json({ msg: "New User Created!", newUser });
  } catch (error) {
    next(error);
  }
});

usersRouter.put("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { newUsername, newPassword } = req.body;
    const updatedUser = await updateUser(userId, newUsername, newPassword);
    res.json({ msg: "User Updated!", updatedUser });
  } catch (error) {
    next(error);
  }
});

usersRouter.delete("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const deletedUser = await deleteUser(userId);
    res.json({ msg: "User Deleted!", deletedUser });
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
