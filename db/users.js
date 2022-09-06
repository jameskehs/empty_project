const { client } = require("./index");

async function createUser(firstName, lastName, email, password) {
  try {
    const {
      rows: [newUser],
    } = await client.query(`INSERT INTO users(firstName, lastName, email, password) VALUES ($1,$2,$3,$4) RETURNING *;`, [
      firstName,
      lastName,
      email,
      password,
    ]);
    return newUser;
  } catch (error) {
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    const {
      rows: [user],
    } = await client.query(`SELECT * FROM users WHERE email = $1`, [email]);
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = { createUser, getUserByEmail };
