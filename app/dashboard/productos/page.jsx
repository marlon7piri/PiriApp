import React from "react";
import ListaDeProductos from "./ListaDeProductos";
import NavProductos from "./NavProductos";
import { getAllProductos } from "@/app/libs/actions/productos/get-productos";
import { getServerSession } from "next-auth";
import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import Pagination from "../usuarios/Pagination";
import ShowEmptyComponent from "@/app/components/ShowEmptyComponent";
import Container from "@/app/components/Container";

export default async function Productos({ searchParams }) {
  const q = searchParams?.query || "";
  const page = searchParams?.page || 1;
  const allData = searchParams?.allData || "no";

  const session = await getServerSession(authoptions);

  if (!session?.user?.restaurante_id) {
    return <div>No se encontró el ID del restaurante</div>;
  }

  const { allproducts, totalPage } = await getAllProductos(
    q,
    page,
    session.user.restaurante_id,
    allData
  );

  if (!allproducts) {
    return <ShowEmptyComponent text={"No hay productos"} color="dark" />;
  }

  return (
    <Container>
      <NavProductos productos={allproducts} />
      <h1 className="text-3xl font-bold text-center">Productos</h1>
      <ListaDeProductos productos={allproducts} />
      <Pagination totalPage={totalPage} currentPage={page} />
    </Container>
  );
}
