import { Restaurante } from "./models/restaurante"
import { connectDb } from "./mongoDb"

export const findRestauranteId = async (id) => {

    try {
        await connectDb()
        const restaurante = await Restaurante.findById(id)
        if (restaurante) {
            return restaurante._id.toString()
        }
        throw new Error(`El restaurante con id: ${id}  no existe`)
    } catch (error) {
        console.log(error)
    }

}