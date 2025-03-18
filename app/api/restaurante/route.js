import { NextResponse } from "next/server";
import { connectDb } from "@/app/libs/mongoDb";
import { Restaurante } from "@/app/libs/models/restaurante";


export async function GET(req) {
  const searchParams = req.nextUrl.searchParams
  const restaurante_id = searchParams.get("restaurante_id")
  try {

    connectDb();
    const restaurantes = await Restaurante.find({usuarios:restaurante_id}).populate("usuarios").populate('productos');

    if (!restaurantes) {
      return NextResponse.json({ message: "No hay restaurantes" });

    }
    
    return NextResponse.json(restaurantes);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
}

export async function POST(req) {
  const { nombre } = await req.json()

  try {
    connectDb();

    const rest = new Restaurante({
      nombre
    });


    await rest.save();

    return NextResponse.json({ message: "Data creada" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
}
