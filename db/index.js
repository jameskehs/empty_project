const { Client } = require("pg");
const client = new Client(process.env.DATABASE_URL || "postgres://localhost:5432/testing");

async function createUser(username, password) {
  try {
    const {
      rows: [user],
    } = await client.query("INSERT INTO users(username,password) VALUES ($1,$2) RETURNING *;", [username, password]);
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query("SELECT * FROM users WHERE id=$1", [userId]);
    return user;
  } catch (error) {
    throw error;
  }
}

async function updateUser(userId, newUsername, newPassword) {
  try {
    const {
      rows: [user],
    } = await client.query("UPDATE users SET username = $1, password = $2 WHERE id=$3 RETURNING *;", [newUsername, newPassword, userId]);
    return user;
  } catch (error) {
    throw error;
  }
}

async function deleteUser(userId) {
  try {
    const {
      rows: [user],
    } = await client.query("DELETE FROM users WHERE id=$1 RETURNING *", [userId]);
    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows } = await client.query("SELECT * FROM users;");
    return rows;
  } catch (error) {
    throw error;
  }
}

async function createLayout(layout) {
  try {
    await client.query(`INSERT INTO siteLayouts(layout) VALUES($1)`, [JSON.stringify(layout)]);
  } catch (error) {
    throw error;
  }
}

async function getLayoutById(layoutId) {
  try {
    const {
      rows: [layout],
    } = await client.query(`SELECT * FROM siteLayouts WHERE id = $1`, [layoutId]);
    return layout;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  client,
  createUser,
  createLayout,
  deleteUser,
  getAllUsers,
  getLayoutById,
  getUserById,
  updateUser,
};
