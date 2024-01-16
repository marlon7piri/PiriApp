
import React from "react";
import NavBarClient from "./NavBarClient";

const layout = ({ children }) => {

  return (
    <div>
      <NavBarClient />
      {children}
    </div>
  );
};

export default layout;
