import { Merma } from "@/app/libs/models/mermas";
import { connectDb } from "@/app/libs/mongoDb";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const id = await params.id;



  try {
      await connectDb();
    const merma = await Merma.findByIdAndDelete(id);

    if (!merma) return NextResponse.json(404);

    return NextResponse.json(merma);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}