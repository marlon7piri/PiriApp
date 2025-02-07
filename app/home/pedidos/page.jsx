import React from "react";
import TablaPedidos from "./TablaPedidos";
import { TablaOrden } from "./TablaOrden";
import styles from"./orden.module.css"

const Pedidos = () => {
  return (
    <div className="w-full h-min-screen h-screen p-4 overflow-scroll">
      <div className={styles.containerPedidos}>
        <div  className="w-full  flex flex-col  ">
          <h2 className="text-3xl">Pedido</h2>
          <TablaPedidos />
        </div >
        <div className="w-full flex flex-col  ">
          <h2 className="text-3xl">Orden</h2>
          <TablaOrden />

        </div>
      </div>
    </div>
  );
};

export default Pedidos;
