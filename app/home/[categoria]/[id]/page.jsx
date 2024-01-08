"use client";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const url = "https://clone-invu-app.vercel.app/api";
const url2 = "http://localhost:3000/api";

const schema = yup
  .object({
    nombre: yup.string().max(20).required(),
    precio: yup.number().positive().required(),
    stock: yup.number().positive().round().required(),
    stock_min: yup.number().positive().round().required(),
  })
  .required();

const EditarProducto = ({ params }) => {
  const router = useRouter();


  const {
    register,
    handleSubmit,
    control,
    reset,

    formState: { errors, isLoading },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const actualizarData = async (data) => {
    const res = await fetch(`${url}/categoriaProducto/${params.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      toast.error("Error");
    } else {
      toast.success("Producto editado");
      router;
      router.back();
      router.refresh();
    }
  };

  useEffect(() => {
    try {
      const getOnlyProducto = async () => {
        const res = await fetch(`${url}/categoriaProducto/${params.id}`);
        const data = await res.json();
        reset(data);
      };
      getOnlyProducto();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <form
        onSubmit={handleSubmit(actualizarData)}
        className="flex flex-col m-auto p-4 w-2/4  gap-4"
      >
        <input
          type="text"
          {...register("nombre", { required: true })}
          placeholder="nombre"
          disabled
        />

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

        <input
          disabled={isLoading}
          type="submit"
          value={isLoading ? "loading..." : "Editar"}
          className="bg-sky-500 px-4 py-2 rounded-md text-slate-900 hover:bg-sky-900 transition duration-500 hover:text-slate-50 cursor-pointer"
        />
      </form>
    </div>
  );
};

export default EditarProducto;
