"use client";

import React, { useEffect } from "react";
import styles from "./section.module.css";
import { useClientContext } from "../context/ClientProvider";
import Image from "next/image";

const DashboardTotalProductos = ({cantidadProductos}) => {

  return (
    <div className={styles.totalProductos}>
      <div className="flex  items-end gap-2 ">
        <span className="absolute top-5 left-5">
          Total de productos
        </span>
      <Image
        src="/productostotales.png"
        alt="icono de dinero"
        width={65}
        height={65}
        className="object-cover"
      />{" "}
      <span className="text-2xl font-bold"> {cantidadProductos}</span>
      </div>
    </div>
  );
};

export default DashboardTotalProductos;
