import React from "react";

const Container = ({ children }) => {
  return (
    <div className="w-full min-h-screen p-20 overflow-y-scroll">{children}</div>
  );
};

export default Container;
