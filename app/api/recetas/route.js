import { findRestauranteId } from "@/app/libs/findRestauranteId";
import { Receta } from "@/app/libs/models/recetas";
import { NextResponse } from "next/server";

export async function POST(req) {
  const receta = await req.json();

  const { restaurante_id, nombre, productos, costo } = receta;

  try {
    const idRestaurante = await findRestauranteId(restaurante_id);

    if (!idRestaurante)
      return NextResponse.json({
        message: "Restaurante no encontrado",
        status: 400,
      });
    const newreceta = new Receta({ restaurante_id, nombre, productos, costo });

    const recetasaved = await newreceta.save();

    return NextResponse.json({ data: recetasaved, status: 201 });
  } catch (error) {
    return NextResponse.json({
      message: "Error creating recipes",
      status: 500,
    });
  }
}
