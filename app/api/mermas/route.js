import { NextResponse } from "next/server";
import { connectDb } from "@/app/libs/mongoDb";
import { Merma } from "@/app/libs/models/mermas";
import { Products } from "@/app/libs/models/productos";
import { findRestauranteId } from "@/app/libs/findRestauranteId";


export async function GET(req, { params }) {
  const { restaurante_id } = await params.userId
  try {
    await connectDb();
    const idfound = await findRestauranteId(restaurante_id)
    let filtro = {restaurante_id:idfound}
    const mermas = await Merma.find(filtro);

    if (!mermas) return NextResponse.json({ message: "No hay mermas" });
    return NextResponse.json(mermas);
  } catch (error) {
    return Response.json({ message: error });
  }
}

export async function POST(req) {
  let stockActual;
  const { nombre, fecha, cantidad, causa, observaciones, id, autor, restaurante_id } =
    await req.json();

  try {
    await connectDb();
    const idFound = await findRestauranteId(restaurante_id)

    const merma = new Merma({
      nombre,
      fecha,
     
      cantidad,
      causa,
      observaciones,
      autor,
      restaurante_id: idFound || ''
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
