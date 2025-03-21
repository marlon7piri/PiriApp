import React from "react";
import { getAllInventarios } from "@/app/libs/actions/inventarios/get-inventarios";
import TablaInventarios from "./TablaInventarios";
import Filtros from "./Filtros";
import { getServerSession } from "next-auth";
import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import { getAreas } from "@/app/libs/actions/areas/get-areas";
import ShowEmptyComponent from "@/app/components/ShowEmptyComponent";
import Container from "@/app/components/Container";

const Inventario = async ({ searchParams }) => {
  const session = await getServerSession(authoptions);
  const fecha = searchParams.fecha || "";
  const area = searchParams.area || "";
  const inventarios = await getAllInventarios(
    session?.user?.restaurante_id,
    fecha,
    area
  );
  const areas = await getAreas(session?.user?.restaurante_id);

  if (!inventarios) {
    return <ShowEmptyComponent text={"No hay inventarios"} color="dark" />;
  }

  return (
    <Container>
      <Filtros areas={areas} />
      <TablaInventarios inventarios={inventarios} fecha={fecha} />
    </Container>
  );
};

export default Inventario;
