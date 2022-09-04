const seedLayout1 = {
  module1: {
    componentName: "NavBar",
    props: {
      companyName: "Dirty Dogs",
      links: [
        { href: "#Gallery", content: "Woof" },
        { href: "#Contact", content: "Bark" },
      ],
    },
  },
  module2: {
    componentName: "Hero",
    props: {
      title: "Woof",
      body: "woof woof woof woof woof woof woof bark bark woof woof woof woof woof woof woof woof bark bark woof woof woof woof woof woof woof woof bark bark woof",
      imgSrc: "/assets/HappyPup.jpeg",
    },
  },
  module3: {
    componentName: "People",
    props: {
      title: "TB3 Staff",
      desc: "Our exceptionally handsome developers",
      persons: [
        { name: "Josh", imgSrc: "/assets/HappyPup.jpeg" },
        { name: "Jim", imgSrc: "/assets/businessCat.jpeg" },
      ],
    },
  },
  module4: {
    componentName: "Gallery",
    props: {
      title: "TB3 Products",
      imagePairs: [
        { subtitle: "We sell happy dogs", imgSrc: "/assets/HappyPup.jpeg" },
        { subtitle: "Cats sell slaves", imgSrc: "/assets/businessCat.jpeg" },
      ],
    },
  },
  module5: {
    componentName: "Contact",
    props: {
      email: "jeathkarnoldbustaorsomethinglikethat@gmail.com",
      phone: "225-123-4567",
      address: "1800 bofa lane",
    },
  },
};

module.exports = seedLayout1;
