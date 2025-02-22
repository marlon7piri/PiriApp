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
    const getOneArea = async () => {
      try {
        const res = await fetch(`${UrlWeb}/areas/${params.idArea}`);
        const area= await res.json();



        reset(area);
      } catch (error) {
        console.log(error);
      }
    };
    getOneArea();
  }, []);
  const enviarData = async (data) => {
    try {
      const res = await fetch(`${UrlWeb}/areas/${params.idArea}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });


      if (!res.ok) {
        toast.error("Error");
      } else {
        toast.success("Área editada");
        router.push("/dashboard/areas");
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

          {...field}
          placeholder="nombre"
        />} />

      {errors.nombre && (
        <span className="text-red-500">
          {" "}
          El nombre del proveedor es requerido y tiene que ser maximo 100
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
