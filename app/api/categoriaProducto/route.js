import { NextResponse } from "next/server";
import { Products } from "../../libs/models/productos";
import { connectDb } from "@/app/libs/mongoDb";


export async function POST(req) {
  const { categoria} = await req.json();

  try {
    await connectDb();

    const allproducts = await Products.find({ categoria:categoria})

    if (!allproducts) return NextResponse.json({ message: "No hay productos" });
    return NextResponse.json(allproducts);
  } catch (error) {
    console.log(error);
    return Response.json({ message: error });
  }
}
