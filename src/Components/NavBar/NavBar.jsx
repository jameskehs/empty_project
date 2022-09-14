import "./NavBar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { isLoggedInContext } from "../Site/Site";

const NavBar = ({ companyName, links }) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(isLoggedInContext);

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
          {isLoggedIn && (
            <a
              href="#hero"
              onClick={() => {
                localStorage.removeItem("JKJBJWT");
                setIsLoggedIn(false);
              }}
            >
              Log out
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
