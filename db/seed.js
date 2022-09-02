const { client, createUser, createLayout } = require("./index");

const seedUsers = [
  { username: "Jim", password: "password" },
  { username: "Josh", password: "1234" },
  { username: "Heath", password: "69" },
  { username: "Vincent", password: "gothgirls" },
];

const seedLayout1 = [
  {
    componentName: "NavBar",
    props: {
      companyName: "Dirty Dogs",
      links: [
        { href: "#Gallery", content: "Woof" },
        { href: "#Contact", content: "Bark" },
      ],
    },
  },
  {
    componentName: "Hero",
    props: {
      title: "Woof",
      body: "woof woof woof woof woof woof woof bark bark woof woof woof woof woof woof woof woof bark bark woof woof woof woof woof woof woof woof bark bark woof",
      imgSrc: "./assets/HappyPup.jpeg",
    },
  },
];

const seedLayout2 = [
  {
    componentName: "NavBar",
    props: {
      companyName: "Catz",
      links: [
        { href: "#hero", content: "Meow" },
        { href: "#about", content: "Hiss" },
      ],
    },
  },
  {
    componentName: "Hero",
    props: {
      title: "MEOW",
      body: "Meow meow meow meow meow meow meow meow meow meow meow",
      imgSrc: "./assets/businessCat.jpeg",
      buttons: [{ content: "Try Now!" }, { content: "Contact Us" }],
    },
  },
  {
    componentName: "Collection",
    props: {
      title: "Our Team",
      desc: "The greatest team you've ever seen.",
      collectionItems: [
        { imgSrc: "./assets/businessCat.jpeg", itemTitle: "Bart", itemDesc: "CEO" },
        { imgSrc: "./assets/businessCat.jpeg", itemTitle: "Tuna", itemDesc: "Accounting" },
        { imgSrc: "./assets/businessCat.jpeg", itemTitle: "Chad", itemDesc: "IT" },
      ],
    },
  },
];

const dropTables = async () => {
  try {
    console.log("Starting to drop tables!");
    await client.query(`
        DROP TABLE IF EXISTS siteLayouts;
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
            password VARCHAR(255) NOT NULL
            );
        CREATE TABLE siteLayouts (
          id serial PRIMARY KEY,
          layout jsonb NOT NULL
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
  await Promise.all(seedUsers.map((user) => createUser(user.username, user.password)));
  await createLayout(seedLayout1);
  await createLayout(seedLayout2);
  client.end();
};

rebuildDB();
