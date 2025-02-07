"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import Image from 'next/image'
import styles from './area.module.css'
const barra = "barra";
const cocina = "cocina";
const Areas = () => {

  return (

  <div className={styles.section}>
      <Link
        href={`/home/${cocina}`}
        className="w-[200px] h-[200px] bg-slate-50  rounded-md flex flex-col justify-center items-center hover:scale-105 transition duration-500 cursor-pointer shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-center">Cocina</h1>
        <Image src='/burguer.svg' alt="imagen de una copa" width={40} height={40}/>

      </Link>
      <Link
        href={`/home/${barra}`}
        className="w-[200px] h-[200px] bg-slate-50  rounded-md flex flex-col justify-center items-center hover:scale-105 transition duration-500 cursor-pointer shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-center">Barra</h1>
        <Image src='/copa.svg' alt="imagen de una copa" width={40} height={40}/>

      </Link>
      <Link
        href={`/home/mermas`}
        className="w-[200px] h-[200px] bg-slate-50  rounded-md flex flex-col justify-center items-center hover:scale-105 transition duration-500 cursor-pointer shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-center">Mermas</h1>
        <Image src='/merma.svg' alt="imagen de una copa" width={40} height={40}/>
      </Link>

    </div>
  );
};

export default Areas;
