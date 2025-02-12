import { NextResponse } from "next/server";
import { connectDb } from "@/app/libs/mongoDb";
import { Inventario } from "@/app/libs/models/inventario";

export async function POST(req, { params }) {
  const fecha = await params.id;

  try {
    await connectDb();
    const invenatriofound = await Inventario.find({}).populate("autor");


    const result = invenatriofound.filter((inventario) => {
      const fecharecuperada = inventario.fecha;
      const fecharecuperadaelegida = fecha;



      return fecharecuperada === fecharecuperadaelegida;
    });

    if (!result)
      return NextResponse.json({ error: "Inventario no encontrado" });


    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Error al cargar invenatrio" });
  }
}

export async function DELETE(req, { params }) {
  const id = await params.id;

  try {
    await connectDb()
    const inv = await Inventario.findByIdAndDelete(id)

    if (!result)
      return NextResponse.json({ error: "Inventario no encontrado" });

   return NextResponse.json(inv);
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar el inventario" });
  }
}
