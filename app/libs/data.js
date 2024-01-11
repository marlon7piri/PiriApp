const { Products, User } = require("./models");
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
    connectDb();
    const allusers = await Products.find({ nombre: { $regex: regex } });
   

    return  allusers 
  } catch (error) {
    throw new Error("Failed to fetch users desde el backend");
  }
};

export const getUsuarios = async (query) => {
  const regex = new RegExp(query, "i");
 

  
  try {
    connectDb();
    const allusers = await User.find({ username: { $regex: regex } });
   

    return  allusers 
  } catch (error) {
    throw new Error("Failed to fetch users desde el backend");
  }
};

