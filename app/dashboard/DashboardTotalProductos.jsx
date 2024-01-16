"use client";

import React, { useEffect } from "react";
import styles from "./section.module.css";
import { useClientContext } from "../home/context/ClientProvider";
import { UrlWeb } from "../libs/UrlWeb";

const DashboardTotalProductos = () => {
  const { setTotalProductos ,totalProductos} = useClientContext();

  useEffect(() => {
    const obtenerTodosLosProductos = async () => {
      const res = await fetch(`${UrlWeb}/productos`);
      const data = await res.json();

      setTotalProductos(data);
    };
    obtenerTodosLosProductos()
  });
  return (
    <div className={styles.totalProductos}>
      Total de Productos: {totalProductos.length}
    </div>
  );
};

export default DashboardTotalProductos;
