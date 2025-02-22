"use client";

import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UrlWeb } from "@/app/libs/UrlWeb";

const schema = yup
  .object({
    nombre: yup.string().max(100).required(),
    email: yup.string().max(100).required(),
    telefono: yup.string().max(20).required(),
    direccion: yup.string().max(200).required(),

  })
  .required();

const EditProveedor = ({ params }) => {
  const router = useRouter();

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
    const getOneProveedor = async () => {
      try {
        const res = await fetch(`${UrlWeb}/proveedor/${params.idProveedor}`);
        const proveedor = await res.json();



        reset(proveedor);
      } catch (error) {
        console.log(error);
      }
    };
    getOneProveedor();
  }, []);
  const enviarData = async (data) => {
    try {
      const res = await fetch(`${UrlWeb}/proveedor/${params.idProveedor}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });


      if (!res.ok) {
        toast.error("Error");
      } else {
        toast.success("Proveedor editado");
        router.push("/dashboard/proveedores");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(enviarData)}
      className="flex flex-col m-auto p-4 w-[60%] gap-4"
    >
      <label htmlFor="">Nombre</label>
      <Controller
        name="nombre"
        defaultValue={''}
        control={control}
        render={({ field }) => <input
          placeholder="nombre"
          {...field}
        />} />

      {errors.nombre && (
        <span className="text-red-500">
          {" "}
          El nombre del proveedor es requerido y tiene que ser maximo 100
          caracteres
        </span>
      )}
      <label htmlFor="">Correo</label>

      <Controller
        name='email'
        control={control}
        render={({ field }) => <input
          {...field}

          placeholder={"correo"}
        />}
      />
      {errors.email && (
        <span className="text-red-500">

          El email es requerido y tiene que ser maximo 100
          caracteres
        </span>
      )}
      <label htmlFor="">Telefono</label>

      <Controller
        name='telefono'
        control={control}
        render={({ field }) => <input
          {...field}
          placeholder="telefono"
        />}
      />

      {errors.telefono && (
        <span className="text-red-500">

          El telefono es requerido y tiene que ser maximo 20
          caracteres
        </span>
      )}
      <label htmlFor="">Dirección</label>
      <Controller

        control={control}
        name="direccion"
        render={({ field }) => <input
          {...field}
          placeholder="direccion"
        />}
      />

      {errors.direccion && (
        <span className="text-red-500">

          La direccion es requerido y tiene que ser maximo 200
          caracteres
        </span>
      )}
      <input

        type="submit"
        value={isLoading ? " loading..." : "Editar"}
        className="bg-sky-500 px-4 py-2 rounded-md text-slate-900 hover:bg-sky-900 transition duration-500 hover:text-slate-50 cursor-pointer"
      />
    </form>
  );
};

export default EditProveedor;
