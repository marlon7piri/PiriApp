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
        nombre: yup.string().max(50).required()

    })
    .required();
const FormNewArea = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const {data:session}=useSession()
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
            setLoading(true);
            const res = await fetch(`${UrlWeb}/areas`, {
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

                toast.success("Area creada");
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
            { }
            <input
                type="text"
                {...register("nombre", { required: true })}
                placeholder="nombre"
            />
            {errors.nombre && (
                <span className="text-red-500">
                    {" "}
                    El nombre del area es requerido y tiene que ser maximo 20
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

export default FormNewArea
