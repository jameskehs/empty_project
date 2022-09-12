import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = ({ companyName, links }) => {
  return (
    <nav>
      <div id="nav-contents">
        <h1 className="nav-companyname">{companyName}</h1>
        <div className="links">
          {links.map((link, index) => {
            return (
              <a key={index} href={link.href}>
                {link.content}
              </a>
            );
          })}
          <Link className="admin-link" to="admin">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
