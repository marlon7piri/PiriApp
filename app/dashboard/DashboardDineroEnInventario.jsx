
import React, { useEffect, useState } from "react";
import styles from "./section.module.css";
import { useClientContext } from "../home/context/ClientProvider";

const DashboardDineroEnInventario = () => {
  const { setTotalProductos, totalProductos, productos } = useClientContext();
  const [dinerototal, setDinerototal] = useState(0)


 /* const obtenerDineroTotal = () => {
    const total = totalProductos.reduce((acc, current) => {
      return (acc = current.precio_por_unidad * current.stock);
    }, 0);
    setDinerototal(total);
    
  };

  useEffect(() => {
    obtenerDineroTotal();
  }, []); */
  return (
    <div className={styles.dineroInventario}>
      Dinero En Inventario: $ {dinerototal}
    </div>
  );
};

export default DashboardDineroEnInventario;
