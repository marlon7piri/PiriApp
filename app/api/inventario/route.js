import { NextResponse } from "next/server";
import { connectDb } from "@/app/libs/mongoDb";
import { Inventario } from "@/app/libs/models/inventario";

export async function POST(req) {
  const { fecha, productos } = await req.json();

  try {
    connectDb();
    const invenatriofound = await Inventario.find({});

    console.log(invenatriofound);

    const exist = invenatriofound.find((inventario) => {
      console.log(inventario.fecha);
      return inventario.fecha === fecha;
    });

    console.log(exist);

    if (exist) {
      return NextResponse.json({
        error: "Ya existe un inventario con la fecha actual",
      },{status:401});
    }
    const newproducts = new Inventario({
      fecha,
      productos,
    });

    const producto = await newproducts.save();
    if (!producto) return NextResponse.status(404);

    return NextResponse.json(producto);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
