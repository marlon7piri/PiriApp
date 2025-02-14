'use client'
import { UrlWeb } from '@/app/libs/UrlWeb';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from "yup";
const schema = yup
    .object({
        nombre: yup.string().max(100).required(),
        email: yup.string().max(100).required(),
        telefono: yup.string().max(20).required(),
        direccion: yup.string().max(200).required(),

    })
    .required();
const FormNewProveedor = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession()
    const router = useRouter()
    const {
        register,
        handleSubmit,

        formState: { errors, isLoading },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const enviarData = async (data) => {

        try {

            if (session.user) {
                setLoading(true);
                const res = await fetch(`${UrlWeb}/proveedor`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                    },
                    body: JSON.stringify({ ...data, restaurante_id: session?.user?.restaurante_id }),
                });


                if (!res.ok) {
                    const data = await res.json();
                    setError(data.message);
                    setLoading(false);
                } else {
                    setLoading(false);

                    toast.success("Proveedor creado");
                    router.push("/dashboard/proveedores");
                    router.refresh();
                }
            } else {
                toast.success("Tiene que inicar session nuevamente");
                setLoading(false);
            }

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    return (

        <form
            onSubmit={handleSubmit(enviarData)}
            className="flex flex-col m-auto p-4 w-[60%] gap-4"
        >
            <label htmlFor="">Nombre</label>
          
            <input
                type="text"
                {...register("nombre", { required: true })}
                placeholder="nombre"
            />
            {errors.nombre && (
                <span className="text-red-500">
                    {" "}
                    El nombre del proveedor es requerido y tiene que ser maximo 100
                    caracteres
                </span>
            )}
            <label htmlFor="">Correo</label>
          
          <input
              type="email"
              {...register("email", { required: true })}
              placeholder="correo"
          />
          {errors.email && (
              <span className="text-red-500">
                
                  El email es requerido y tiene que ser maximo 100
                  caracteres
              </span>
          )}
           <label htmlFor="">Telefono</label>
           <input
              type="text"
              {...register("telefono", { required: true })}
              placeholder="telefono"
          />
          {errors.telefono && (
              <span className="text-red-500">
                
                  El telefono es requerido y tiene que ser maximo 20
                  caracteres
              </span>
          )}
          <label htmlFor="">Dirección</label>
           <input
              type="text"
              {...register("direccion", { required: true })}
              placeholder="direccion"
          />
          {errors.direccion && (
              <span className="text-red-500">
                
                  La direccion es requerido y tiene que ser maximo 200
                  caracteres
              </span>
          )}
            <input

                type="submit"
                value={loading ? " loading..." : "Crear"}
                className="bg-sky-500 px-4 py-2 rounded-md text-slate-900 hover:bg-sky-900 transition duration-500 hover:text-slate-50 cursor-pointer"
            />
        </form>
    )
}

export default FormNewProveedor
