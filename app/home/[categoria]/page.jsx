
import React from "react";
import TablaProductos from "./TablaProductos";
import FiltrosProductos from "./FiltrosProductos";

import { getProductos } from "@/app/libs/actions/productos/get-productos";
import { getServerSession } from "next-auth";
import { authoptions } from "@/app/api/auth/[...nextauth]/route";





const Categoria = async ({ searchParams, params }) => {
  const q = searchParams.query || ""
  const mas_vendido = searchParams.mas_vendido || ""

  const orden = searchParams.orden || ""
  const session = await getServerSession(authoptions)



  const res = await getProductos(params.categoria, q, mas_vendido, orden, session?.user?.restaurante_id);


  if (!res || res.length === 0) {
    return <div>No se encontraron productos.</div>;
  }


  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4 min-h-screen">

      <FiltrosProductos productos={res} />

      <TablaProductos productos={res} />
    </div>
  );
};

export default Categoria;
