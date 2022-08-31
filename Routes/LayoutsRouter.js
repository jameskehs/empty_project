const express = require("express");
const { getLayoutById } = require("../db");
const LayoutsRouter = express.Router();

LayoutsRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const layout = await getLayoutById(id);
    res.send(layout);
  } catch (error) {
    next(error);
  }
});
module.exports = LayoutsRouter;
