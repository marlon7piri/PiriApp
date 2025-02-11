import { User } from "./models/usuarios"
import { connectDb } from "./mongoDb"

export const findUserId = async (id) => {

    try {
        await connectDb()
        const user = await User.findById(id)
        if (user) {
            return user._id.toString()
        }
        throw new Error(`El usuario con id: ${id}  no existe`)
    } catch (error) {
        console.log(error)
    }

}