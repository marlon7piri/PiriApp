'use client'
import React from "react";
import styles from "./section.module.css";
import Image from 'next/image'

const DashboardDineroEnInventario = ({dineroTotal}) => {


 

 
  return (
    <div className={styles.dineroInventario}>
       <span className="absolute top-5 left-5">
         Dinero en Inventario
        </span>
    <Image src='/moneyicon.png' alt="icono de dinero" width={65} height={65} className="object-cover"/><span className="text-2xl font-bold">${dineroTotal?.toFixed(2)}</span>
    </div>
  );
};

export default DashboardDineroEnInventario;
