import { Products } from "@/app/libs/models";
import { connectDb } from "@/app/libs/mongoDb";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const id = await params.id;

  await connectDb();
  try {
    const productdeleted = await Products.findByIdAndDelete(id);

    if (!productdeleted) return NextResponse.json(404);

    return NextResponse.json(productdeleted);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
export async function GET(req, { params }) {
  const id = await params.id;

  await connectDb();
  try {
    const producto = await Products.findById(id);

    if (!producto) return NextResponse.json(404);

    return NextResponse.json(producto);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}

export async function PUT(req, { params }) {
  const id = params.id;
  const data = await req.json();

  console.log(id);
  console.log(data);

  try {
    connectDb();
    const producto = await Products.findByIdAndUpdate(id, data);

    if (!producto)
      return NextResponse.json({ message: "No se encontro ningun producto" });
    return NextResponse.json(producto);
  } catch (error) {
    return Response.json({ message: error });
  }
}
