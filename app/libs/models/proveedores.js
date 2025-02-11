import mongoose from "mongoose";

const ProveedoresSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

export const Proveedor =
  mongoose.models.Proveedor || mongoose.model("Proveedor", ProveedoresSchema);
