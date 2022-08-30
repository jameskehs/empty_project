import "./App.css";
import { NavBar } from "./Components/NavBar/NavBar";

const navData = {
  companyName: "TB3",
  links: [
    { href: "#hero", content: "Hero" },
    { href: "#about", content: "About" },
  ],
};

function App() {
  return (
    <div className="App">
      <NavBar navData={navData} />
    </div>
  );
}

export default App;
