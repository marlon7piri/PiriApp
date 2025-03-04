import React from "react";
import TablaRecetas from "./TablaRecetas";
import FiltrosRecetas from "./FiltrosRecetas";
import { getMermas } from "@/app/libs/actions/mermas/get-mermas";
import { getServerSession } from "next-auth";
import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import ShowEmptyComponent from "@/app/components/ShowEmptyComponent";
import { getRecetas } from "@/app/libs/actions/recetas/getRecetas";

const Mermas = async ({ searchParams }) => {
  const session = await getServerSession(authoptions);
  const fecha = searchParams.fecha || "";
  const query = searchParams.query || "";
  const { recetas } = await getRecetas(query, session?.user?.restaurante_id);

  if (!recetas) {
    return <ShowEmptyComponent text={"No hay recetas"} color="dark" />;
  }

  return (
    <div className="w-full h-screen ">
      <div className="w-full h-full flex flex-col gap-4 p-4">
        <FiltrosRecetas />
        <h1 className="text-3xl font-bold text-center">Recetas</h1>
        <TablaRecetas mermas={recetas} />
      </div>
    </div>
  );
};

export default Mermas;
