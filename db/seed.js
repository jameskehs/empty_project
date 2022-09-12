const { client } = require("./index");
const seedLayout1 = require("./layout1");
const seedLayout2 = require("./layout2");
const { addModule } = require("./modules");
const { addSite } = require("./sites");
const { createUser } = require("./users");
const bcrypt = require("bcrypt");

const dropTables = async () => {
  try {
    console.log("Starting to drop tables!");
    await client.query(`
        DROP TABLE IF EXISTS modules;
        DROP TABLE IF EXISTS sites;
        DROP TABLE IF EXISTS users
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
        userID serial PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        superUser BOOL DEFAULT FALSE
      );
      CREATE TABLE sites (
          siteID serial PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          ownerID INT REFERENCES users(userID) NOT NULL
      );
      CREATE TABLE modules (
          moduleID serial PRIMARY KEY,
          module jsonb NOT NULL,
          sortOrder INT NOT NULL,
          siteID INT REFERENCES sites(siteID) NOT NULL,
          UNIQUE (sortOrder, siteID) 
      );
    `);
    console.log("Finished creating tables!");
  } catch (error) {
    console.error("Error creating tables", error);
  }
};

const rebuildDB = async () => {
  const password = await bcrypt.hash("password", 10);
  client.connect();
  await dropTables();
  await createTables();
  await createUser("Jimmy Kehs", "jim@gmail.com", password, true);
  await createUser("Josh Byrd", "josh@gmail.com", password, true);
  await addSite("Dirty Dogs", 1);
  await addModule(1, seedLayout1.module1, 1);
  await addModule(1, seedLayout1.module2, 2);
  await addModule(1, seedLayout1.module3, 3);
  await addModule(1, seedLayout1.module4, 4);
  await addModule(1, seedLayout1.module5, 5);
  await addSite("Catz", 2);
  await addModule(2, seedLayout2.module1, 1);
  await addModule(2, seedLayout2.module2, 2);
  await addModule(2, seedLayout2.module3, 3);
  await addModule(2, seedLayout2.module4, 4);

  client.end();
};

rebuildDB();
