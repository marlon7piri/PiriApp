"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import Image from 'next/image'
import styles from './area.module.css'

const Areas = ({ areas }) => {

  return (

    <div className={styles.section}>

      <div className={styles.grid_card}>
        {!areas || areas.length == 0 ? <h1>No hay areas aún</h1> : areas.map((area) => {
          return (
            <Link
              href={`/home/${area?._id}`}
              className="w-[220px] h-[200px] bg-slate-50  rounded-md flex flex-col justify-center items-center hover:scale-105 transition duration-500 cursor-pointer shadow-2xl"
            >
              <h1 className="text-3xl font-bold text-center">{area?.nombre}</h1>
              <Image src='/boxagotado.png' alt="imagen de una copa" width={40} height={40} />

            </Link>
          )
        })}
      </div>




    </div>
  );
};

export default Areas;
