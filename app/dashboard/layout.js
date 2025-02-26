"use client";
import React, { useContext } from "react";
import NavBar from "../components/NavBar";
import "./styles.css"
import {  useClientContext } from "../context/ClientProvider";
import { RxHamburgerMenu } from "react-icons/rx";

const layout = ({ children }) => {
  const {changeWidth} = useClientContext()


  return (

    <div className="w-full h-full  bg-[#F9F7F8]">
      <div className="flex gap-2 ">

        <NavBar />
        <div className="w-full h-screen  relative p-2 overflow-y-scroll border border-slate-700 rounded-md ">
          <button className="btnOpen" onClick={changeWidth}>
           <abbr title='Cerrar/Abrir'> <RxHamburgerMenu size={24} style={{fontWeight:"bold"}}/></abbr>
          </button>
          {children}
        </div>
      </div>
    </div>

  );
};

export default layout;
