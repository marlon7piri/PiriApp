import { Products } from "@/app/libs/models/productos";
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
  const {
    nombre,

    categoria,
    stock,
    stock_min,
    unidad,
    mas_vendido,
    proveedor,
    itbms,
    costo,
    presentacion_por_unidad,
    precio_por_unidad,
  } = await req.json();

  let valor = 0;
  let impuesto_del_valor = 0;
  let costototal = 0;

  let itbmsreal = 0;
  if (itbms == 0) {
    itbmsreal = 0;
    valor = precio_por_unidad / presentacion_por_unidad;
  
    costototal = valor;
  } else if (itbms == 7) {
    valor = precio_por_unidad / presentacion_por_unidad;
    impuesto_del_valor = valor * 0.07;
    costototal = valor + impuesto_del_valor;
  } else if (itbms == 10) {
    valor = precio_por_unidad / presentacion_por_unidad;
    impuesto_del_valor = valor * 0.1;
    costototal = valor + impuesto_del_valor;
  }

  

  try {
    connectDb();
    const producto = await Products.findByIdAndUpdate(id, {
      nombre,
      precio_por_unidad,
      presentacion_por_unidad,
      categoria,
      stock,
      stock_min,
      unidad,
      mas_vendido,
      proveedor,
      itbms: itbmsreal.toFixed(2),
      costo: costototal.toFixed(
        2
      ),
    });

   
    if (!producto)
      return NextResponse.json({ message: "No se encontro ningun producto" });
    return NextResponse.json(producto);
  } catch (error) {
    return Response.json({ message: error });
  }
}
