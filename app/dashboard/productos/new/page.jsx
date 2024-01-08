"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const url = "https://clone-invu-app.vercel.app/api";
const url2 = "http://localhost:3000/api";
const urlproveedores =
  "https://inventario-barra-backend.vercel.app/api/proveedores";

const schema = yup
  .object({
    nombre: yup.string().max(20).required(),
    precio: yup.number().positive().required(),
    stock: yup.number().positive().round().required(),
    stock_min: yup.number().positive().round().required(),
  })
  .required();

const NewProducto = () => {
  const router = useRouter();
  const [proveedores, setProveedores] = useState([]);

  const {
    register,
    handleSubmit,

    formState: { errors, isLoading },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const enviarData = async (data) => {
    const res = await fetch(`${url}/productos`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      toast.error("Error");
    } else {
      toast.success("Producto creado");
      router.push("/dashboard/productos");
      router.refresh();
    }
  };
  useEffect(()=>{
    const getProveedores = async () => {
      const res = await fetch(urlproveedores);
      const data = await res.json();
      setProveedores(data);
    };
    getProveedores()
  },[])

 

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
      <select
        name=""
        id=""
        {...register("unidad", { required: true })}
        className="outline-none p-2 border border-slate-900 rounded-md focus:border-sky-500"
      >
        <option value="KG">KG</option>
        <option value="LT">LT</option>
        <option value="UND">UND</option>
        <option value="PQTE">PQTE</option>
      </select>
      <label htmlFor="">Mas Vendido</label>
      <select
        name=""
        id=""
        {...register("mas_vendido", { required: true })}
        className="outline-none p-2 border border-slate-900 rounded-md focus:border-sky-500"
      >
        <option value={true}>Si</option>
        <option value={false}>No</option>
      </select>
      <label htmlFor="">Proveedor</label>
      <select
        name=""
        id=""
       
        {...register("proveedor", { required: true })}
        className="p-2 outline-none cursor-pointer"
      >
        <option value=""> </option>
        {proveedores?.map((e) => {
          return <option value={e.nombre}>{e.nombre}</option>;
        })}
      </select>

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
      <input
        disabled={isLoading}
        type="submit"
        value="Crear"
        className="bg-sky-500 px-4 py-2 rounded-md text-slate-900 hover:bg-sky-900 transition duration-500 hover:text-slate-50 cursor-pointer"
      />
    </form>
  );
};

export default NewProducto;
