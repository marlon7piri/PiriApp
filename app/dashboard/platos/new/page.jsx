import React from "react";
import FormNewPlato from "./FormNewPlato";
import { getRecetas } from "@/app/libs/actions/recetas/getRecetas";
import { getServerSession } from "next-auth";
import { authoptions } from "@/app/api/auth/[...nextauth]/route";

const NewPlato = async ({ searchParams }) => {
  const session = await getServerSession(authoptions);
  const query = searchParams.query || "";
  const { recetas } = await getRecetas(query, session?.user?.restaurante_id);

  return (
    <div>
      <h1>Nuevo plato</h1>
      <FormNewPlato recetas={recetas} />
    </div>
  );
};

export default NewPlato;
