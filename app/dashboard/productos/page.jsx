import React from "react";
import ListaDeProductos from "./ListaDeProductos";
import NavProductos from "./NavProductos";
import { getAllProductos } from "@/app/libs/actions/productos/get-productos";
import { getServerSession } from "next-auth";
import { authoptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Productos({ searchParams }) {
  const q = searchParams?.query || "";
  const session = await getServerSession(authoptions)
  const productos = await getAllProductos(q, session?.user?.restaurante_id);



  return (
    <div className="flex flex-col gap-4 ">
      <NavProductos productos={productos} />
      <ListaDeProductos productos={productos} />
    </div>
  );
}
