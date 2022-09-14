const express = require("express");
const { updateModule } = require("../db/modules");
const modulesRouter = express.Router();

modulesRouter.put("/:moduleId", async (req, res, next) => {
  try {
    const { moduleId } = req.params;
    const { module, sortOrder } = req.body;
    const updatedModule = await updateModule(moduleId, module, sortOrder);
    res.send(updatedModule);
  } catch (error) {
    next(error);
  }
});

module.exports = modulesRouter;
