import React from "react";
import TablaMermas from "./TablaMermas";
import FiltrosMermas from "./FiltrosMermas";
import { getMermas } from "@/app/libs/actions/mermas/get-mermas";
import { getServerSession } from "next-auth";
import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import ShowEmptyComponent from "@/app/components/ShowEmptyComponent";
import Container from "@/app/components/Container";

const Mermas = async ({ searchParams }) => {
  const session = await getServerSession(authoptions);
  const fecha = searchParams.fecha || "";
  const mermas = await getMermas(session?.user?.restaurante_id, fecha);

  if (!mermas) {
    return <ShowEmptyComponent text={"No hay mermas"} color="dark" />;
  }

  return (
    <Container>
      <FiltrosMermas />
      <h1 className="text-3xl font-bold text-center">Mermas</h1>
      <TablaMermas mermas={mermas} />
    </Container>
  );
};

export default Mermas;
