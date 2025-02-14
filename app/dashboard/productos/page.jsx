import React from "react";
import ListaDeProductos from "./ListaDeProductos";
import NavProductos from "./NavProductos";
import { getAllProductos } from "@/app/libs/actions/productos/get-productos";
import { getServerSession } from "next-auth";
import { authoptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Productos({ searchParams }) {
  const q = searchParams?.query || "";
  const session = await getServerSession(authoptions)

  console.log("Sesión del usuario:", session);
  console.log("Restaurante ID:", session?.user?.restaurante_id);


  if (!session?.user?.restaurante_id) {
    return <div>No se encontró el ID del restaurante</div>;
  }

  let productos;
  try {
    productos = await getAllProductos(q, session.user.restaurante_id);
    console.log("Productos obtenidos:", productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return <div>Error al cargar los productos</div>;
  }

  if (!productos || productos.length === 0) {
    return <div>No se encontraron productos</div>;
  }



  return (
    <div className="flex flex-col gap-4 ">
      <NavProductos productos={productos} />
      <ListaDeProductos productos={productos} />
    </div>
  );
}
