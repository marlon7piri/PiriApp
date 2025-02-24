
import React from "react";
import TablaProductos from "./TablaProductos";
import FiltrosProductos from "./FiltrosProductos";

import { getProductos } from "@/app/libs/actions/productos/get-productos";
import { getServerSession } from "next-auth";
import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import Pagination from "@/app/dashboard/usuarios/Pagination";





const Categoria = async ({ searchParams, params }) => {
  const q = searchParams.query || ""
  const mas_vendido = searchParams.mas_vendido || ""
const page  =  searchParams.page || 1
  const orden = searchParams.orden || ""
  const session = await getServerSession(authoptions)



  const {allproducts,totalPage} = await getProductos(params.categoria, q,page, mas_vendido, orden, session?.user?.restaurante_id);


 


  return (
    <div className="w-full h-screen flex flex-col justify-center items-center p-8 ">

      <FiltrosProductos productos={allproducts} />

      <TablaProductos productos={allproducts} />

      <Pagination totalPage={totalPage} currentPage={page}/>
    </div>
  );
};

export default Categoria;
