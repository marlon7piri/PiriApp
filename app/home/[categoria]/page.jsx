
import React from "react";
import TablaProductos from "./TablaProductos";
import FiltrosProductos from "./FiltrosProductos";

import { getProductos } from "@/app/libs/actions/productos/get-productos";





const Categoria = async ({ searchParams, params }) => {
  const q = searchParams.query || ""
  const mas_vendido = searchParams.mas_vendido || ""

  const orden = searchParams.orden || ""




  const res = await getProductos(params.categoria, q, mas_vendido, orden);





  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4 min-h-screen">
      <FiltrosProductos />
      <TablaProductos productos={res} />
    </div>
  );
};

export default Categoria;
