
import React from "react";
import NavBarClient from "./NavBarClient";
import { ClientProvider } from "./context/ClientProvider";

const layout = ({ children }) => {

  return (
    <ClientProvider>
      <NavBarClient />
      {children}
    </ClientProvider>
  );
};

export default layout;
