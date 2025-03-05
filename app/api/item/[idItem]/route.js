import { Item } from "@/app/libs/models/item";
import { connectDb } from "@/app/libs/mongoDb";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const idItem = await params.idItem;

  try {
    await connectDb();
    const itemdeleted = await Item.findByIdAndDelete(idItem);

    if (!itemdeleted) return NextResponse.json({ error: "Item no encontrado" });

    return NextResponse.json(itemdeleted);
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar el Item" });
  }
}
