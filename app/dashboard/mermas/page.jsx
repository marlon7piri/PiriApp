import React from "react";
import TablaMermas from "./TablaMermas";
import FiltrosMermas from "./FiltrosMermas";
import { getMermas } from "@/app/libs/actions/mermas/get-mermas";
import { getServerSession } from "next-auth";
import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import ShowEmptyComponent from "@/app/components/ShowEmptyComponent";

const Mermas = async ({ searchParams }) => {
  const session = await getServerSession(authoptions);
  const fecha = searchParams.fecha || "";
  const mermas = await getMermas(session?.user?.restaurante_id, fecha);

  if (!mermas) {
    return <ShowEmptyComponent text={"No hay mermas"} color="dark" />;
  }

  return (
    <div className="w-full h-screen ">
      <div className="w-full h-full flex flex-col gap-4 p-4">
        <FiltrosMermas />
        <h1 className="text-3xl font-bold text-center">Mermas</h1>
        <TablaMermas mermas={mermas} />
      </div>
    </div>
  );
};

export default Mermas;
