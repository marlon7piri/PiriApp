"use client";

import Link from "next/link";
import React, { useEffect } from "react";
const barra = "barra";
const cocina = "cocina";
const Areas = () => {

  return (
    <div className="w-full h-screen flex justify-center items-center gap-8">
      <Link
        href={`/home/${cocina}`}
        className="w-[200px] h-[200px] bg-slate-50  rounded-md flex justify-center items-center hover:scale-105 transition duration-500 cursor-pointer shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-center">Cocina</h1>
      </Link>
      <Link
        href={`/home/${barra}`}
        className="w-[200px] h-[200px] bg-slate-50  rounded-md flex justify-center items-center hover:scale-105 transition duration-500 cursor-pointer shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-center">Barra</h1>
      </Link>
      <Link
        href={`/home/mermas`}
        className="w-[200px] h-[200px] bg-slate-50  rounded-md flex justify-center items-center hover:scale-105 transition duration-500 cursor-pointer shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-center">Mermas</h1>
      </Link>

    </div>
  );
};

export default Areas;
