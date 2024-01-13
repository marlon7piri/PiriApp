"use client";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UrlWeb, urlproveedores } from "@/app/libs/UrlWeb";

const schema = yup
  .object({
    nombre: yup.string().max(50).required(),
    stock: yup.number().positive().required(),
    stock_min: yup.number().positive().required(),
   
    precio_por_unidad: yup.number().positive().required(),
    presentacion_por_unidad: yup.number().positive().required(),
    itbms: yup.number().required(),
  })
  .required();

const EditProducto = ({ params }) => {
  const router = useRouter();
  const [proveedores, setProveedores] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isLoading },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const getUnSoloProducto = async () => {
      try {
        const res = await fetch(`${UrlWeb}/productos/${params.idProducto}`);
        const producto = await res.json();

        reset(producto);
      } catch (error) {
        console.log(error);
      }
    };
    getUnSoloProducto();
  }, []);
  const enviarData = async (data) => {
    console.log(data)

    const res = await fetch(`${UrlWeb}/productos/${params.idProducto}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      toast.error("Error al editar el producto");
    }else{
      toast.success("Producto editado");
      router.push("/dashboard/productos");
      router.refresh();
    }

   
  };

  useEffect(() => {
    const getProveedores = async () => {
      const res = await fetch(urlproveedores);
      const data = await res.json();
      setProveedores(data);
    };
    getProveedores();
  }, []);
  return (
    <form
      onSubmit={handleSubmit(enviarData)}
      className="flex flex-col m-auto p-4 w-2/4 gap-4"
    >
      <label htmlFor="">Nombre</label>

      <Controller
        name="nombre"
        control={control}
        defaultValue=""
        render={({ field }) => <input {...field} placeholder="Nombre" />}
      />

      {errors.nombre && (
        <span className="text-red-500">
          {" "}
          El nombre del producto es requerido y tiene que ser maximo 20
          caracteres
        </span>
      )}
      <label htmlFor="">precio por unidad</label>
      <Controller
        name="precio_por_unidad"
        control={control}
        defaultValue=""
        render={({ field }) => <input {...field} placeholder="precio_por_unidad" />}
      />

      {errors.precio_por_unidad && (
        <span className="text-red-500">
          {" "}
          Solo son numeros enteros y con decimales{" "}
        </span>
      )}
      <label htmlFor="">presentacion por unidad</label>
      
      <Controller
        name="presentacion_por_unidad"
        control={control}
        defaultValue=""
        render={({ field }) => <input {...field} placeholder="presentacion_por_unidad" />}
      />

      {errors.presentacion_por_unidad && (
        <span className="text-red-500">
          {" "}
          Solo son numeros enteros y con decimales{" "}
        </span>
      )}
      <label htmlFor="">itbms</label>

        <Controller
        name="itbms"
        control={control}
        defaultValue=""
        render={({ field }) => <input {...field} placeholder="itbms" />}
      />

      {errors.itbms && (
        <span className="text-red-500">
          {" "}
          Solo son numeros enteros y con decimales{" "}
        </span>
      )}
     
      <label htmlFor="">Stock</label>

      <Controller
        name="stock"
        control={control}
        defaultValue=""
        render={({ field }) => <input {...field} placeholder="Stock" />}
      />

      {errors.stock && (
        <span className="text-red-500">
          {" "}
          Solo son numeros enteros y con decimales{" "}
        </span>
      )}
      <label htmlFor="">Stock Min</label>

      <Controller
        name="stock_min"
        control={control}
        defaultValue=""
        render={({ field }) => <input {...field} placeholder="Stock_min" />}
      />

      {errors.stock_min && (
        <span className="text-red-500">
          {" "}
          Solo son numeros enteros y con decimales{" "}
        </span>
      )}
      

      <Controller
        name="proveedor"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <>
            {" "}
            <label htmlFor="">Unidad</label>
            <select
              {...field}
              className="outline-none p-2 border border-slate-900 rounded-md focus:border-sky-500"
            >
              <option value="KG">KG</option>
              <option value="LT">LT</option>
              <option value="UND">UND</option>
              <option value="PQTE">PQTE</option>
            </select>
          </>
        )}
      />

      {errors.unidad && (
        <span className="text-red-500">
          {" "}
          Solo son numeros enteros y con decimales{" "}
        </span>
      )}

      <Controller
        name="proveedor"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <>
            {" "}
            <label htmlFor="">Proveedor</label>
            <select
              {...field}
              name=""
              id=""
              className="p-2 outline-none cursor-pointer"
            >
              <option value=""> </option>
              {proveedores?.map((e) => {
                return <option value={e.nombre}>{e.nombre}</option>;
              })}
            </select>
          </>
        )}
      />
      <Controller
        name="mas_vendido"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <>
            <label htmlFor="">Mas Vendido</label>
            <select
              name=""
              id=""
              {...field}
              className="outline-none p-2 border border-slate-900 rounded-md focus:border-sky-500"
            >
              <option value={true}>Si</option>
              <option value={false}>No</option>
            </select>
          </>
        )}
      />

      <Controller
        name="categoria"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div className="flex gap-4 justify-center items-center">
            <div>
              Cocina <input  {...field}  type="radio" value="cocina" />
            </div>
            <div>
              Barra <input  {...field} type="radio" value="barra"  />
            </div>
          </div>
        )}
      />

      <input
        disabled={isLoading}
        type="submit"
        value={params.idProducto ? "Editar " : "Crear"}
        className="bg-sky-500 px-4 py-2 rounded-md text-slate-900 hover:bg-sky-900 transition duration-500 hover:text-slate-50 cursor-pointer"
      />
    </form>
  );
};

export default EditProducto;
