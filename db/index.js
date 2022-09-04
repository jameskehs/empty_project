const { Client } = require("pg");
const client = new Client(
  process.env.DATABASE_URL || "postgres://localhost:5432/testing"
);

async function createLayout(layout) {
  try {
    await client.query(`INSERT INTO siteLayouts(layout) VALUES($1)`, [
      JSON.stringify(layout),
    ]);
  } catch (error) {
    throw error;
  }
}

async function getLayoutById(layoutId) {
  try {
    const {
      rows: [layout],
    } = await client.query(`SELECT * FROM siteLayouts WHERE id = $1`, [
      layoutId,
    ]);
    return layout;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  client,
  createLayout,
  getLayoutById,
};
