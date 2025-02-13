"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UrlWeb, urlproveedores } from "@/app/libs/UrlWeb";
import { useSession } from "next-auth/react";

const schema = yup
    .object({
        nombre: yup.string().max(50).required(),
        stock: yup.number().positive().required().min(0),
        stock_min: yup.number().positive().required().min(0),

        precio_por_unidad: yup.number().positive().required().min(0),
        presentacion_por_unidad: yup.number().positive().required().min(0),
        itbms: yup.number().required(),
    })
    .required();

const FormNewProducto = ({ areas }) => {
    const router = useRouter();
    const [proveedores, setProveedores] = useState([]);
    const { data: session } = useSession()

    const {
        register,
        handleSubmit,

        formState: { errors, isLoading },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const enviarData = async (data) => {
        const res = await fetch(`${UrlWeb}/productos`, {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
            body: JSON.stringify({ ...data, restaurante_id: session?.user?.restaurante_id }),
        });

        if (!res.ok) {
            toast.error("Error");
        } else {
            const producto = await res.json();
            toast.success("Producto creado");
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
                    El nombre del producto es requerido y tiene que ser maximo 20
                    caracteres
                </span>
            )}
            <label htmlFor="">Presentacion por unidad</label>
            <input
                type="text"
                {...register("presentacion_por_unidad", { required: true })}
                placeholder="presentacion_por_unidad"
            />
            {errors.presentacion_por_unidad && (
                <span className="text-red-500">
                    {" "}
                    Solo son numeros enteros y con decimales{" "}
                </span>
            )}
            <label htmlFor="">Precio por unidad</label>

            <input
                type="text"
                {...register("precio_por_unidad", { required: true })}
                placeholder="precio_por_unidad"
            />
            {errors.precio_por_unidad && (
                <span className="text-red-500">
                    {" "}
                    Solo son numeros enteros y con decimales{" "}
                </span>
            )}
            <label htmlFor="">ITBMS</label>

            <select
                {...register("itbms", { required: true })}
                className="outline-none p-2 border border-slate-900 rounded-md focus:border-sky-500"
            >
                <option value={0}>0</option>
                <option value={7}>7</option>
                <option value={10}>10</option>
            </select>

            {errors.itbms && (
                <span className="text-red-500">
                    {" "}
                    Solo son numeros enteros y con decimales{" "}
                </span>
            )}
            <label htmlFor="">Stock</label>

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
            <label htmlFor="">Stock Min</label>

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

            <label htmlFor="">Unidad</label>

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
                    return (
                        <option value={e.nombre} key={e._id}>
                            {e.nombre}
                        </option>
                    );
                })}
            </select>

            <div className="flex gap-4 justify-center items-center">
                {areas.map(t => {
                    return <div className="flex gap-2">
                        <span> {t.nombre}</span>
                        <input
                            type="radio"
                            value={t._id}
                            {...register("area", { required: true })}
                        />
                    </div>
                }
                )}

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

export default FormNewProducto;
