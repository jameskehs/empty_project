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

module.exports = seedLayout2;
