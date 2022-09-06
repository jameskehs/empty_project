const { client } = require("./index");

async function addModule(siteID, module, sortOrder) {
  try {
    const {
      rows: [newModule],
    } = await client.query(
      `INSERT INTO modules(module,sortOrder,siteID) VALUES ($1,$2,$3) RETURNING *;`,
      [JSON.stringify(module), sortOrder, siteID]
    );
    return newModule;
  } catch (error) {
    console.log("Error adding module");
    throw error;
  }
}

async function updateModule(moduleID, module, sortOrder) {
  try {
    const {
      rows: [updatedModule],
    } = await client.query(
      `UPDATE modules SET module = $1, sortOrder = $2 WHERE moduleID = $3 RETURNING *;`,
      [JSON.stringify(module), sortOrder, moduleID]
    );
    return updatedModule;
  } catch (error) {
    throw error;
  }
}

module.exports = { addModule, updateModule };
