import { NextResponse } from "next/server";
import { connectDb } from "@/app/libs/mongoDb";
import { Inventario } from "@/app/libs/models/inventario";

export async function POST(req) {
  const { fecha, productos, area } = await req.json();

  try {
    connectDb();
    const inventarios = await Inventario.find({});


    const exist = inventarios.find((inventario) => {
      
      return inventario.fecha === fecha && inventario.area === area;
    });


    if (exist) {
      return NextResponse.json(
        {
          error: "No se puede repetir inventario o area ",
        },
        { status: 401 }
      );
    }

    const newproducts = new Inventario({
      fecha,
      productos,
      area
    });

    const producto = await newproducts.save();
    if (!producto) return NextResponse.status(404);

    return NextResponse.json(producto);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
