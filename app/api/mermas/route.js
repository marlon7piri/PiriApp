import { NextResponse } from "next/server";
import { connectDb } from "@/app/libs/mongoDb";
import { Merma } from "@/app/libs/models/mermas";
import { Products } from "@/app/libs/models/productos";


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
  let stockActual;
  const { nombre, fecha, servicio, cantidad, causa, observaciones, id } =
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


    const productfound = await Products.findById(id);

    stockActual = productfound.stock - cantidad

   

    if (stockActual < 0) {
      productfound.stock = 0;
    } else {
      productfound.stock = stockActual
    }


    await productfound.save()

    const mermanueva = await merma.save();

    if (!merma) return NextResponse.status(404);

    return NextResponse.json(mermanueva);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
