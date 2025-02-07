import { Products } from "@/app/libs/models/productos";
import { NextResponse } from "next/server";

export async function GET(req, res) {

    let dineroTotal = 0;
    let productosAgotados = []
    let cantidadProductos;
    let productosMasVendidos=[]

    try {
        cantidadProductos = await Products.find({}).countDocuments();
        const productos = await Products.find({});



        productos.forEach((element) => {

            dineroTotal += element.stock * element.precio_por_unidad;

            if (element.stock < element.stock_min) {
                productosAgotados.push(element)

            }
            if (element.mas_vendido) {
                productosMasVendidos.push(element)
            }


        });



const td = productosMasVendidos.slice(0,5)

        return NextResponse.json({ cantidadProductos, dineroTotal, productosAgotados,productosMasVendidos:td })
    } catch (error) {

        return NextResponse.json({ message: error }).status(500)
    }
}