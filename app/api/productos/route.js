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

  console.log(itbms);
  console.log(precio_por_unidad);
  let itbmsreal = 0;
  if (itbms == 0) {
    itbmsreal = 0;
    console.log(itbmsreal);
  } else if (itbms == 7) {
    itbmsreal = precio_por_unidad * 0.07
    console.log(itbmsreal);
  } else if (itbms == 10) {
    itbmsreal = precio_por_unidad * 0.1
    console.log(itbmsreal);
  }

  const a = precio_por_unidad / presentacion_por_unidad + itbmsreal;
  console.log(a);
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
      itbms: itbmsreal.toFixed(2),
      costo: a.toFixed(
        2
      ),
      presentacion_por_unidad,
      precio_por_unidad,
    });

    const producto = await newproducts.save();
    if (!producto) return NextResponse.status(404);

    return NextResponse.json(producto);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
