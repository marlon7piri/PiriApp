
import React from "react";
import { getServerSession } from "next-auth";
import FormNewProducto from "./FormNewProducto";
import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import { getAreas } from "@/app/libs/actions/areas/get-areas";


const page = async() => {
  const session = await getServerSession(authoptions)
  const areas = await getAreas( session?.user?.restaurante_id)

  
  return (
    <div>
      <FormNewProducto areas={areas}/>
    </div>
  );
};

export default page;
