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
      title: "Meow",
      body: "Meow meow meow meow meow meow meow meow meow meow meow",
      imgSrc: "/assets/businessCat.png",
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
          imgSrc: "/assets/businessCat.png",
          itemTitle: "Bart",
          itemDesc: "CEO",
        },
        {
          imgSrc: "/assets/businessCat.png",
          itemTitle: "Tuna",
          itemDesc: "Accounting",
        },
        {
          imgSrc: "/assets/businessCat.png",
          itemTitle: "Chad",
          itemDesc: "IT",
        },
      ],
    },
  },
  module4: {
    componentName: "Gallery",
    props: {
      title: "What we Do",
      images: [
        {
          imgSrc: "/assets/consulting.jpg",
          imgSubtitle: "Consulting",
        },
        {
          imgSrc: "/assets/taxes.jpg",
          imgSubtitle: "Our Taxes",
        },
        {
          imgSrc: "/assets/profit.jpg",
          imgSubtitle: "Profit",
        },
      ],
    },
  },
};

module.exports = seedLayout2;
