const { Products } = require("./models/productos");
const { User } = require("./models/usuarios");
const { connectDb } = require("./mongoDb");

export const getProductos = async () => {
  try {
    connectDb();
    const allproducts = await Products.find();

    return allproducts;
  } catch (error) {
    return NextResponse.json({ message: error });
  }
};

export const getProducts = async (query) => {
  const regex = new RegExp(query, "i");



  try {
    await connectDb();
    const allusers = await Products.find({ nombre: { $regex: regex } });


    return allusers
  } catch (error) {
    throw new Error("Failed to fetch products desde el backend");
  }
};

export const getUsuarios = async (query, restaurante_id) => {
  const regex = new RegExp(query, "i");



  try {
    await connectDb();
    const filtro = { username: { $regex: regex }, restaurante_id }
    const allusers = await User.find(filtro);


    return allusers
  } catch (error) {
    throw new Error("Failed to fetch users desde el backend");
  }
};

