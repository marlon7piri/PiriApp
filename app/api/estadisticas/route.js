import { Products } from "@/app/libs/models/productos";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const restaurante_id = await req.query

    try {
        let dineroTotal = 0;
        let productosAgotados = [];
        let productosMasVendidos = [];
        let filtro = { restaurante_id }

       

        // Obtener los productos
        const productos = await Products.find(filtro);



        // Procesar productos
        productos.forEach((element) => {
            dineroTotal += element.stock * element.costo;

            if (element.stock < element.stock_min) {
                productosAgotados.push(element);
            }

            if (element.mas_vendido) {
                productosMasVendidos.push(element);
            }
        });

        // Tomar solo los 5 más vendidos
        const productosTop = productosMasVendidos.slice(0, 5);

        return NextResponse.json(
            { cantidadProductos: productos.length, dineroTotal, productosAgotados, productosMasVendidos: productosTop },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error: "Error al cargar estadísticas" + error }, { status: 500 });
    }
}
