import mongoose from "mongoose";

const ProveedoresSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
});

export const Proveedor =
  mongoose.models.User || mongoose.model("Proveedor", ProveedoresSchema);
