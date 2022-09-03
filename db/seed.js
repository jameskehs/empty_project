const { client, createUser, createLayout } = require("./index");
const seedLayout1 = require("./layout1");
const seedLayout2 = require("./layout2");

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
        DROP TABLE IF EXISTS modules;
        DROP TABLE IF EXISTS sites;
        DROP TABLE IF EXISTS siteLayouts;
        DROP TABLE IF EXISTS users;
    `);
    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables", error);
  }
};

//Leave siteLayouts for now until new structure is confirmed.
const createTables = async () => {
  try {
    console.log("Creating tables!");
    await client.query(`
        CREATE TABLE siteLayouts (
          id serial PRIMARY KEY,
          layout jsonb NOT NULL
        );
        CREATE TABLE sites (
          siteID serial PRIMARY KEY,
          name VARCHAR(255) NOT NULL
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
  client.connect();
  await dropTables();
  await createTables();
  await createLayout(seedLayout1);
  await createLayout(seedLayout2);
  client.end();
};

rebuildDB();
