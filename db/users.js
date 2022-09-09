const { client } = require("./index");

async function createUser(name, email, password, superUser = false) {
  try {
    const {
      rows: [newUser],
    } = await client.query(`INSERT INTO users(name, email, password, superUser) VALUES ($1,$2,$3,$4) RETURNING *;`, [
      name,
      email,
      password,
      superUser,
    ]);
    delete newUser.password;
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

async function getAllUsers() {
  try {
    const { rows } = await client.query(`SELECT userID, name, email, superuser FROM users`);
    const allUsers = await Promise.all(
      rows.map(async (user) => {
        const userSites = await getUserSites(user.userid);
        user.sites = userSites;
        return user;
      })
    );
    return allUsers;
  } catch (error) {
    throw error;
  }
}

async function getUserSites(userID) {
  try {
    const { rows } = await client.query(`SELECT * FROM sites WHERE ownerID = $1`, [userID]);
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = { createUser, getAllUsers, getUserByEmail };
