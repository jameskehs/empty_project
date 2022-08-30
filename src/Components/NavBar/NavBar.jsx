import React from "react";

export const NavBar = ({ navData }) => {
  const { companyName, links } = navData;

  return (
    <div>
      <h1>{companyName}</h1>
      {links.map((link) => {
        return <a href={link.href}>{link.content}</a>;
      })}
    </div>
  );
};
