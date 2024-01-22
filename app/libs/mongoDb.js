import mongoose from "mongoose";

export const connectDb = async () => {

    const connection ={}

    console.log(process.env.NODE_ENV);

    
  try {
    if(connection.isConnected) return 
     const db = await mongoose.connect( process.env.NODE_ENV ==='development' ? process.env.MONGO_URL_TEST : process.env.MONGO_URL) 
    connection.isConnected = db.connections[0].readyState
  } catch (error) {
    throw new Error(error);
  }
};
