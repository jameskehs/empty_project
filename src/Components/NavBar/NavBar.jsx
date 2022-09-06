import "./NavBar.css";
import { Link} from "react-router-dom";

const NavBar = ({ companyName, links }) => {
  return (
    <nav>
      <h1>{companyName}</h1>
      <div className="links">
        {links.map((link, index) => {
          return (
            <a key={index} href={link.href}>
              {link.content}
            </a>
          );
        })}
      </div>
      <div>
      <Link to="admin">Admin</Link>
      </div>
    </nav>
  );
};

export default NavBar;
