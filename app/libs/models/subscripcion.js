import mongoose from 'mongoose'


const Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fecha: {
        type: Date,
        required: true
    },
    plan: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    }
})