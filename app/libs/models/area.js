import mongoose from "mongoose";

const SchemaArea = new mongoose.Schema(
  {
    nombre: {
      type: String,
      require: true,
    },
    restaurante_id: {
      type: String,
      require: true,
     
  },
   
  },
{ timestamps: true }
);

export const Area =
  mongoose.models?.Area ||
  mongoose.model("Area", SchemaArea);
