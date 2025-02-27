import { findRestauranteId } from "@/app/libs/findRestauranteId";
import { Receta } from "@/app/libs/models/recetas";
import { connectDb } from "@/app/libs/mongoDb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const id = await params.restaurante_id;

  try {
    await connectDb();
    const idRestaurante = await findRestauranteId(id);
    const filtro = { restaurante_id: idRestaurante };

    if (!idRestaurante) return NextResponse.json(404);

    const recetas = await Receta.find(filtro).populate(
      "productos.producto nombre costo"
    );

    return NextResponse.json(recetas);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
