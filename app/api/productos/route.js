import { NextResponse } from "next/server";
import { Products } from "../../libs/models/productos";
import { connectDb } from "@/app/libs/mongoDb";

export async function GET() {
  try {
    connectDb();
    const allproducts = await Products.find({});

    if (!allproducts) return NextResponse.json({ message: "No hay productos" });
    return NextResponse.json(allproducts);
  } catch (error) {
    return Response.json({ message: error });
  }
}

export async function POST(req) {
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
    const newproducts = new Products({
      nombre,

      categoria,
      stock,
      stock_min,
      unidad,
      mas_vendido,
      proveedor,
      presentacion_por_unidad,
      precio_por_unidad,
      itbms: itbmsreal.toFixed(2),
      costo: costototal.toFixed(2),
    });

    const producto = await newproducts.save();
    if (!producto) return NextResponse.status(404);

    return NextResponse.json(producto);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
