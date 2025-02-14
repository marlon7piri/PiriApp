import { findRestauranteId } from '@/app/libs/findRestauranteId'
import { Proveedor } from '@/app/libs/models/proveedores';
import { connectDb } from '@/app/libs/mongoDb';
import { NextResponse } from 'next/server'

export async function POST(req) {
    const { nombre, email, telefono, direccion, restaurante_id } = await req.json()
    try {
        await connectDb();
        const existRest = await findRestauranteId(restaurante_id)
        if (!existRest) throw new Error(`El restaurante con id:${restaurante_id} no existe`)


        const newProv = new Proveedor({  nombre, email, telefono, direccion, restaurante_id: existRest })


        const prov = await newProv.save();
        console.log(prov)
        return NextResponse.json(prov)
    } catch (error) {
        return NextResponse.json({ message: error })
    }

}

