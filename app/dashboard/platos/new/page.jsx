import React from "react";
import FormNewPlato from "./FormNewPlato";
import { getRecetas } from "@/app/libs/actions/recetas/getRecetas";
import { getServerSession } from "next-auth";
import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import Container from "@/app/components/Container";

const NewPlato = async ({ searchParams }) => {
  const session = await getServerSession(authoptions);
  const query = searchParams.query || "";
  const { recetas } = await getRecetas(query, session?.user?.restaurante_id);

  return (
    <Container>
      <h1 className="text-center text-4xl font-normal mb-4">Nuevo Item</h1>
      <FormNewPlato recetas={recetas} />
    </Container>
  );
};

export default NewPlato;
