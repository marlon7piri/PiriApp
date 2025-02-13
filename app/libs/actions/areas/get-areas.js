import { connectDb } from "@/app/libs/mongoDb";
import { NextResponse } from "next/server";
import { Restaurante } from "../../models/restaurante";
import { Area } from "../../models/area";

export const getAreas = async (restaurante_id, query) => {

    const regexExp = new RegExp(query, 'i')
    try {
        await connectDb();
        let filtro = { restaurante_id, nombre: { $regex: regexExp } }
        const resta = await Restaurante.findById(restaurante_id)

        if (!resta) return NextResponse.json({ message: 'No existe el restaurante' });



        const allareas = await Area.find(filtro)

        return allareas;
    } catch (error) {
        return NextResponse.json({ message: error });
    }
};

