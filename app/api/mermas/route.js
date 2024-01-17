import { NextResponse } from "next/server";
import { connectDb } from "@/app/libs/mongoDb";
import { Merma } from "@/app/libs/models/mermas";

export async function GET() {
  try {
    connectDb();
    const allproducts = await Merma.find({});

    if (!allproducts) return NextResponse.json({ message: "No hay productos" });
    return NextResponse.json(allproducts);
  } catch (error) {
    return Response.json({ message: error });
  }
}

export async function POST(req) {
  const { nombre, fecha, servicio, cantidad, causa, observaciones } =
    await req.json();

  console.log(nombre, fecha, servicio, cantidad, causa, observaciones);
  try {
    connectDb();
    const merma = new Merma({
      nombre,
      fecha,
      servicio,
      cantidad,
      causa,
      observaciones,
    });
    const mermanueva = await merma.save();
    console.log(mermanueva);
    if (!merma) return NextResponse.status(404);

    return NextResponse.json(mermanueva);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
