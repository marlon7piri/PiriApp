import React from "react";
import TablaPedidos from "./TablaPedidos";
import { TablaOrden } from "./TablaOrden";

const Pedidos = () => {
  return (
    <div className="w-full h-screen p-4">
      <div className="w-full h-full flex flex-col justify-center ">
        <TablaPedidos />
        <TablaOrden />
      </div>
    </div>
  );
};

export default Pedidos;
