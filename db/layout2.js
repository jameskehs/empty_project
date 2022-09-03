const seedLayout2 = {
  module1: {
    componentName: "NavBar",
    props: {
      companyName: "Catz",
      links: [
        { href: "#hero", content: "Meow" },
        { href: "#about", content: "Hiss" },
      ],
    },
  },
  module2: {
    componentName: "Hero",
    props: {
      title: "MEOW",
      body: "Meow meow meow meow meow meow meow meow meow meow meow",
      imgSrc: "/assets/businessCat.jpeg",
      buttons: [{ content: "Try Now!" }, { content: "Contact Us" }],
    },
  },
  module3: {
    componentName: "Collection",
    props: {
      title: "Our Team",
      desc: "The greatest team you've ever seen.",
      collectionItems: [
        {
          imgSrc: "/assets/businessCat.jpeg",
          itemTitle: "Bart",
          itemDesc: "CEO",
        },
        {
          imgSrc: "/assets/businessCat.jpeg",
          itemTitle: "Tuna",
          itemDesc: "Accounting",
        },
        {
          imgSrc: "/assets/businessCat.jpeg",
          itemTitle: "Chad",
          itemDesc: "IT",
        },
      ],
    },
  },
};

module.exports = seedLayout2;
