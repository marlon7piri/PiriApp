import mongoose from "mongoose";

const MermasSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    fecha: {
      type: String,
      required: true,
    },
    
    cantidad: {
      type: Number,
      required: true,
    },
    causa: {
      type: String,
      required: true,
    },
    observaciones: {
      type: String,
      required: true,
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    restaurante_id:{
      type:String,
      required:true
     
    }
  },
  {
    timestamps: true,
  }
);

export const Merma =
  mongoose.models?.Merma || mongoose.model("Merma", MermasSchema);
