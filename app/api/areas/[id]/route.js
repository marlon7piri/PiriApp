import { Area } from "@/app/libs/models/area";
import { connectDb } from "@/app/libs/mongoDb";
import { NextResponse } from "next/server";


export async function DELETE(req, { params }) {
  const id = await params.id;

  await connectDb();
  try {
    const area = await Area.findByIdAndDelete(id);

    if (!area) return NextResponse.json(404);

    return NextResponse.json(area);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
export async function GET(req, { params }) {
    const id = await params.id;

    try {
        await connectDb();
        const area = await Area.findById(id);

        if (!area) return NextResponse.json(404);

        const { nombre} = area

        return NextResponse.json({ nombre});
    } catch (error) {
        return NextResponse.json({ message: error });
    }
}

export async function PUT(req, { params }) {
    const id = params.id;
    const data = await req.json();



    try {
        connectDb();
        const area = await Area.findByIdAndUpdate(id, {
            ...data,

        });

        if (!area) return NextResponse.json({ message: "No se encontro ningun area" });

        return NextResponse.json(area);
    } catch (error) {
        return Response.json({ message: error });
    }
}
