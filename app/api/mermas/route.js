import { NextResponse } from "next/server";
import { connectDb } from "@/app/libs/mongoDb";
import { Merma } from "@/app/libs/models/mermas";

export async function GET() {
  try {
    connectDb();
    const mermas = await Merma.find({});

    if (!mermas) return NextResponse.json({ message: "No hay mermas" });
    return NextResponse.json(mermas);
  } catch (error) {
    return Response.json({ message: error });
  }
}

export async function POST(req) {
  const { nombre, fecha, servicio, cantidad, causa, observaciones } =
    await req.json();

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
    if (!merma) return NextResponse.status(404);

    return NextResponse.json(mermanueva);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
