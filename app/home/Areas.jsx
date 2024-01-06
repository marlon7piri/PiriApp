"use client";

import Link from "next/link";
import React, { useEffect } from "react";
const barra = "barra";
const cocina = "cocina";
const Areas = () => {

  return (
    <div className="w-full flex gap-8">
      <Link
        href={`/home/${cocina}`}
        className="w-[400px] h-[400px] bg-sky-500  rounded-md flex justify-center items-center hover:scale-105 transition duration-500 cursor-pointer"
      >
        <h1 className="text-3xl font-bold text-center">Cocina</h1>
      </Link>
      <Link
        href={`/home/${barra}`}
        className="w-[400px] h-[400px] bg-sky-500  rounded-md flex justify-center items-center hover:scale-105 transition duration-500 cursor-pointer"
      >
        <h1 className="text-3xl font-bold text-center">Barra</h1>
      </Link>
    </div>
  );
};

export default Areas;
