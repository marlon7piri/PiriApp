'use client'
import React from "react";
import TablaPedidos from "./TablaPedidos";
import { TablaOrden } from "./TablaOrden";
import styles from "./orden.module.css"
import { useClientContext } from "@/app/context/ClientProvider";

const Pedidos = () => {
  const { pedidos } = useClientContext();
  if (pedidos.length == 0) {
    return <div className="w-full h-screen flex justify-center items-center">
      <h1 className="text-slate-50 text-4xl">No hay pedidos</h1>
    </div>
  }

  return (
    <div className="w-full h-min-screen h-screen p-4 overflow-scroll">
      <div className={styles.containerPedidos}>
        <div className="w-full  flex flex-col  ">
          <h2 className="text-3xl text-slate-50">Pedido</h2>
          <TablaPedidos pedidos={pedidos} />
        </div >
        <div className="w-full flex flex-col  ">
          <h2 className="text-3xl text-slate-50">Orden</h2>
          <TablaOrden />

        </div>
      </div>
    </div>
  );
};

export default Pedidos;
