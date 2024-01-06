"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import {  useRouter } from "next/navigation";

const url = "http://localhost:3000";

const schema = yup
  .object({
    nombre: yup.string().max(20).required(),
    precio: yup.number().positive().required(),
    stock: yup.number().positive().round().required(),
    stock_min: yup.number().positive().round().required(),
  })
  .required();

const EditProducto = () => {
    const router =useRouter()
    

  const {
    register,
    handleSubmit,

    formState: { errors,isLoading },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const enviarData = async (data) => {
   const res =  await  fetch(`${url}/api/productos`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body:JSON.stringify(data)
    });

   
   
       if(!res.ok){
        toast.error("Error")

       }else{
        toast.success("Producto creado")
        router.push('/dashboard/productos')
        router.refresh()
       }
   
  };
  return (
    <form
      onSubmit={handleSubmit(enviarData)}
      className="flex flex-col m-auto p-4 w-2/4 gap-4"
    >
      <input
        type="text"
        {...register("nombre", { required: true })}
        placeholder="nombre"
      />
      {errors.nombre && (
        <span className="text-red-500">
          {" "}
          El nombre del producto es requerido y tiene que ser maximo 20
          caracteres
        </span>
      )}
      <input
        type="text"
        {...register("precio", { required: true })}
        placeholder="precio"
      />
      {errors.precio && (
        <span className="text-red-500">
          {" "}
          Solo son numeros enteros y con decimales{" "}
        </span>
      )}
      <input
        type="text"
        {...register("stock", { required: true })}
        placeholder="stock"
      />
      {errors.stock && (
        <span className="text-red-500">
          {" "}
          Solo son numeros enteros y con decimales{" "}
        </span>
      )}

      <input
        type="text"
        {...register("stock_min", { required: true })}
        placeholder="stock_min"
      />
      {errors.stock_min && (
        <span className="text-red-500">
          {" "}
          Solo son numeros enteros y con decimales{" "}
        </span>
      )}

      <div className="flex gap-4 justify-center items-center">
        <div>
          Cocina{" "}
          <input
            type="radio"
            value="cocina"
            {...register("categoria", { required: true })}
          />
        </div>
        <div>
          Barra{" "}
          <input
            type="radio"
            value="barra"
            {...register("categoria", { required: true })}
          />
        </div>
      </div>
      <input  disabled={isLoading} type="submit" value="Crear"  className="bg-sky-500 px-4 py-2 rounded-md text-slate-900 hover:bg-sky-900 transition duration-500 hover:text-slate-50 cursor-pointer"/>
    </form>
  );
};

export default EditProducto;
