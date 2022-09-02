import "./NavBar.css";

const NavBar = ({ companyName, links }) => {
  return (
    <nav>
      <h1>{companyName}</h1>
      <div className="links">
        {links.map((link) => {
          return <a href={link.href}>{link.content}</a>;
        })}
      </div>
    </nav>
  );
};

export default NavBar;
