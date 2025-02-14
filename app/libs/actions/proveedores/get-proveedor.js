import { connectDb } from "@/app/libs/mongoDb";
import { NextResponse } from "next/server";
import { Restaurante } from "../../models/restaurante";
import { Proveedor } from "../../models/proveedores";

export const getProveedores = async (restaurante_id, query) => {

    const regexExp = new RegExp(query, 'i')
    try {
        await connectDb();
        let filtro = { restaurante_id, nombre: { $regex: regexExp } }

        const resta = await Restaurante.findById(restaurante_id)

        if (!resta) return NextResponse.json({ message: 'No existe el restaurante' });



        const allproveedores = await Proveedor.find(filtro)

        return allproveedores;
    } catch (error) {
        return NextResponse.json({ message: error });
    }
};

export const getAllProveedores = async (restaurante_id) => {

    
    try {
        await connectDb();
        let filtro = { restaurante_id}

        const resta = await Restaurante.findById(restaurante_id)

        if (!resta) return NextResponse.json({ message: 'No existe el restaurante' });



        const allproveedores = await Proveedor.find(filtro)

        return allproveedores;
    } catch (error) {
        return NextResponse.json({ message: error });
    }
};
