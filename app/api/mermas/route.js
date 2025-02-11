import { NextResponse } from "next/server";
import { connectDb } from "@/app/libs/mongoDb";
import { Merma } from "@/app/libs/models/mermas";
import { Products } from "@/app/libs/models/productos";
import { findUserId } from "@/app/libs/findUserId";


export async function GET(req, { params }) {
  const { userId } = await params.userId
  try {
    await connectDb();
    const idfound = await findUserId(userId)
    const mermas = await Merma.find({ userId: idfound });

    if (!mermas) return NextResponse.json({ message: "No hay mermas" });
    return NextResponse.json(mermas);
  } catch (error) {
    return Response.json({ message: error });
  }
}

export async function POST(req) {
  let stockActual;
  const { nombre, fecha, servicio, cantidad, causa, observaciones, id, autor, userId } =
    await req.json();

  try {
    await connectDb();
    const idFound = await findUserId(userId)

    const merma = new Merma({
      nombre,
      fecha,
      servicio,
      cantidad,
      causa,
      observaciones,
      autor,
      userId: idFound || ''
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
