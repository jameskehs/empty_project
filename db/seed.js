const { client, createUser } = require("./index");

const seedUsers = [
  { username: "Jim", password: "password" },
  { username: "Josh", password: "1234" },
  { username: "Heath", password: "69" },
  { username: "Vincent", password: "gothgirls" },
];

const dropTables = async () => {
  try {
    console.log("Starting to drop tables!");
    await client.query(`
        DROP TABLE IF EXISTS users;
    `);
    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables", error);
  }
};

const createTables = async () => {
  try {
    console.log("Creating tables!");
    await client.query(`
        CREATE TABLE users (
            id serial PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL);
    `);
    console.log("Finished creating tables!");
  } catch (error) {
    console.error("Error creating tables", error);
  }
};

const rebuildDB = async () => {
  client.connect();
  await dropTables();
  await createTables();
  await Promise.all(
    seedUsers.map((user) => createUser(user.username, user.password))
  );
  client.end();
};

rebuildDB();
