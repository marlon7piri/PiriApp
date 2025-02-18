import React from "react";
import { getUsuarios } from "@/app/libs/data";
import { getServerSession } from "next-auth";
import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import TablaAreas from "./TablaAreas";
import NavCategorias from "./NavProductos";
import { getAreas } from "@/app/libs/actions/areas/get-areas";


export default async function Categorias({ searchParams }) {
  const session = await getServerSession(authoptions)
  const query = searchParams.query || ''
  const data = await getAreas(session?.user?.restaurante_id,query);

  return (
    <div className="w-full ">
      <h1 className="text-center text-gray-900 font-bold text-2xl">Categorias</h1>
      <NavCategorias /> 
      <TablaAreas categorias={data} />

    </div>
  );
}
