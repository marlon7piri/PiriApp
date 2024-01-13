
import React from "react";
import NavBar from "../components/NavBar";

const layout = ({ children }) => {


  return (
    
      <div className="w-full h-full  ">
        <div className="flex gap-2">
          <NavBar />
<div className="w-full h-screen bg-slate-300 p-8 overflow-y-scroll border border-slate-700 rounded-md">
{children}
</div>
        </div>
      </div>
   
  );
};

export default layout;
