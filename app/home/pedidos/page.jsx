import React from "react";
import TablaPedidos from "./TablaPedidos";
import { TablaOrden } from "./TablaOrden";

const Pedidos = () => {
  return (
    <div className="w-full h-min-screen h-screen p-4 overflow-scroll">
      <div className="w-full h-full grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-1 gap-8 mt-24 p-4 items-center justify-start">
        <div className="w-[50%]">
          <TablaPedidos />
        </div >
        <div className="w-[50%]">
        <TablaOrden />

        </div>
      </div>
    </div>
  );
};

export default Pedidos;
