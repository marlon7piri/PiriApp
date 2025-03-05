import { findRestauranteId } from "@/app/libs/findRestauranteId";
import { Item } from "@/app/libs/models/item";
import { connectDb } from "@/app/libs/mongoDb";
import { NextResponse } from "next/server";

export async function POST(req) {
  const item = await req.json();
  const { restaurante_id } = item;

  try {
    await connectDb();

    const found = await findRestauranteId(restaurante_id);

    if (!found)
      return NextResponse.json({ message: "No existe el restaurante" });

    const newItem = new Item({
      ...item,
    });

    const savedItem = await newItem.save();
    return NextResponse.json({ data: savedItem, status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error server" + error });
  }
}
