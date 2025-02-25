
import React from "react";
import TablaProductos from "./TablaProductos";
import FiltrosProductos from "./FiltrosProductos";

import { getProductos } from "@/app/libs/actions/productos/get-productos";
import { getServerSession } from "next-auth";
import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import Pagination from "@/app/dashboard/usuarios/Pagination";
import ShowEmptyComponent from "@/app/components/ShowEmptyComponent";





const Categoria = async ({ searchParams, params }) => {
  const q = searchParams.query || ""
  const mas_vendido = searchParams.mas_vendido || ""
  const page = searchParams.page || 1
  const orden = searchParams.orden || ""
  const session = await getServerSession(authoptions)



  const { allproducts, totalPage } = await getProductos(params.categoria, q, page, mas_vendido, orden, session?.user?.restaurante_id);



 
  if (!allproducts) {
    return <ShowEmptyComponent text={"No hay productos"} color='white' />
  }

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center p-8 ">

      <FiltrosProductos productos={allproducts} />

      <TablaProductos productos={allproducts} />

      <Pagination totalPage={totalPage} currentPage={page} />
    </div>
  );
};

export default Categoria;
