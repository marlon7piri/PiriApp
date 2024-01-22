import { NextResponse } from "next/server";
import { connectDb } from "@/app/libs/mongoDb";
import { Inventario } from "@/app/libs/models/inventario";

export async function GET() {
  try {
    connectDb();
    const inventarios = await Inventario.find({});

    if (!inventarios) return NextResponse.json({ message: "No hay inventarios" });
    return NextResponse.json(inventarios);
  } catch (error) {
    return Response.json({ message: error });
  }
 /*  return NextResponse.json({ message: "Inventarios" }); */
}

export async function POST(req) {
  const { fecha, productos } = await req.json();


  try {
    connectDb();
    const newproducts = new Inventario({
      fecha,
      productos,
    });

    const producto = await newproducts.save();
    if (!producto) return NextResponse.status(404);

    return NextResponse.json(producto);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
