"use client";

import React, { useEffect } from "react";
import styles from "./section.module.css";
import { useClientContext } from "../home/context/ClientProvider";


const DashboardTotalProductos = () => {
    const {totalProductos} = useClientContext()

  return (
    <div className={styles.totalProductos}>
      Total de Productos: {totalProductos.length}
    </div>
  );
};

export default DashboardTotalProductos;
