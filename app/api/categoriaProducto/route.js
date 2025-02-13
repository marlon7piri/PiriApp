import { NextResponse } from "next/server";
import { Products } from "../../libs/models/productos";
import { connectDb } from "@/app/libs/mongoDb";


export async function POST(req) {
  const { area} = await req.json();

  try {
    await connectDb();
    let filtro = {restaurante_id,area:area}
    const allproducts = await Products.find(filtro)

    if (!allproducts) return NextResponse.json({ message: "No hay productos" });
    return NextResponse.json(allproducts);
  } catch (error) {
    console.log(error);
    return Response.json({ message: error });
  }
}
