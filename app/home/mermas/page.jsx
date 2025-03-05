import React from "react";
import FormMermas from "./FormMermas";
import { getAllProductos } from "@/app/libs/actions/productos/get-productos";
import { getServerSession } from "next-auth";
import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import Container from "@/app/components/Container";

const Mermas = async ({ searchParams }) => {
  const q = searchParams.query || "";
  const allData = "si";
  const page = 1;
  const session = await getServerSession(authoptions);
  const { allproducts, totalPage } = await getAllProductos(
    q,
    page,
    session?.user?.restaurante_id,
    allData
  );

  return (
    <Container>
      <FormMermas productos={allproducts} />
    </Container>
  );
};

export default Mermas;
