import React from "react";
import FormNewReceta from "./FormNewReceta";
import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getAllProductos } from "@/app/libs/actions/productos/get-productos";

const page = async ({ searchParams }) => {
  const session = await getServerSession(authoptions);
  const page = searchParams.page || 1;
  const q = searchParams.query || "";

  const { allproducts, totalPage } = await getAllProductos(
    q,
    page,
    session.user.restaurante_id,
    "si"
  );

  return <FormNewReceta allproductos={allproducts} />;
};

export default page;
