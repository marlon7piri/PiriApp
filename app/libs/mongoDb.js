import mongoose from "mongoose";


const connection = { isConnected: null }; // Mueve esta variable fuera de la función
export const connectDb = async () => {

  try {
    if (connection.isConnected) return;

    const db = await mongoose.connect(
      process.env.NODE_ENV === "development"
        ? process.env.MONGO_URL_TEST
        : process.env.MONGO_URL
    );

    connection.isConnected = db.connections[0].readyState;
    console.log("🔗 Conectado a la base de datos");
  } catch (error) {
    
    console.error("❌ Error al conectar a la BD:", error);
    throw new Error(error);
  }
};
