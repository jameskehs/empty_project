const express = require("express");
const { getLayoutById } = require("../db");
const { buildSite, getAllSites } = require("../db/sites");
const LayoutsRouter = express.Router();

LayoutsRouter.get("/all", async (req, res, next) => {
  try {
    const allLayouts = await getAllSites();
    res.send(allLayouts);
  } catch (error) {
    next(error);
  }
});
LayoutsRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const layout = await buildSite(id);
    res.send(layout);
  } catch (error) {
    next(error);
  }
});
module.exports = LayoutsRouter;
