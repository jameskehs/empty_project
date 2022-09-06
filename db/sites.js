const { client } = require("./index");

async function addSite(siteName) {
  try {
    const { rows } = await client.query(
      `INSERT INTO sites(name) VALUES ($1) RETURNING *;`,
      [siteName]
    );
    return rows;
  } catch (error) {
    console.log("Error adding site");
    throw error;
  }
}

async function getAllSites() {
  try {
    const { rows } = await client.query(`SELECT * FROM sites;`);
    return rows;
  } catch (error) {
    console.log("Error getting all sites");
    throw error;
  }
}

async function buildSite(siteID) {
  try {
    const { rows } = await client.query(
      `SELECT * FROM modules WHERE siteID = $1 ORDER BY sortOrder ASC;`,
      [siteID]
    );
    return rows;
  } catch (error) {
    console.log("Error building site");
    throw error;
  }
}

module.exports = { addSite, buildSite, getAllSites };
