import { NextResponse } from "next/server";
import { Products } from "../../libs/models";
import { connectDb } from "@/app/libs/mongoDb";

export  async function GET() {
  try {
    connectDb();
    const allproducts = await Products.find({});

    if (!allproducts) return NextResponse.json({message:"No hay productos"});
console.log(allproducts);
    return NextResponse.json(allproducts);
  } catch (error) {
    return Response.json({ message: error });
  }
}

export  async function POST(req) {
  const { nombre, precio, categoria, stock, stock_min } = await req.json();

  try {
    connectDb();
    const newproducts =  new Products({
      nombre,
      precio:precio.toString(),
      categoria,
      stock,
      stock_min,
    });

    const producto = await newproducts.save()

    if (!producto) return NextResponse.status(404);

    return NextResponse.json(producto);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
