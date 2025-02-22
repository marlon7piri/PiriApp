import { Proveedor } from "@/app/libs/models/proveedores";
import { connectDb } from "@/app/libs/mongoDb";
import { NextResponse } from "next/server";


export async function DELETE(req, { params }) {
  const id = await params.id;

  await connectDb();
  try {
    const proveedor = await Proveedor.findByIdAndDelete(id);

    if (!proveedor) return NextResponse.json(404);

    return NextResponse.json(proveedor);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
export async function GET(req, { params }) {
    const id = await params.id;

    try {
        await connectDb();
        const proveedor = await Proveedor.findById(id);

        if (!proveedor) return NextResponse.json(404);

        const { nombre, email, telefono, direccion } = proveedor

        return NextResponse.json({ nombre, email, telefono, direccion });
    } catch (error) {
        return NextResponse.json({ message: error });
    }
}

export async function PUT(req, { params }) {
    const id = params.id;
    const data = await req.json();



    try {
        connectDb();
        const proveedor = await Proveedor.findByIdAndUpdate(id, {
            ...data,

        });

        if (!proveedor) return NextResponse.json({ message: "No se encontro ningun proveedor" });

        return NextResponse.json(proveedor);
    } catch (error) {
        return Response.json({ message: error });
    }
}
