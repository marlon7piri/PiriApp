"use client";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UrlWeb } from "@/app/libs/UrlWeb";

const schema = yup
    .object({
        nombre: yup.string().max(50).required(),
        stock: yup.number().positive().required().min(0),
        stock_min: yup.number().positive().required(),
        area: yup.string().required(),
        precio_por_unidad: yup.number().positive().required(),
        presentacion_por_unidad: yup.number().positive().required(),
        itbms: yup.number().required(),
    })
    .required();

const FormEditProducto = ({ params, areas, proveedores }) => {
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

        try {


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
            } else {
                toast.success("Producto editado");
                router.push("/dashboard/productos");
                router.refresh();
            }
        } catch (error) {
            console.log(error)
        }
    };


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
                render={({ field }) => (
                    <input {...field} placeholder="precio_por_unidad" />
                )}
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
                render={({ field }) => (
                    <input {...field} placeholder="presentacion_por_unidad" />
                )}
            />

            {errors.presentacion_por_unidad && (
                <span className="text-red-500">
                    {" "}
                    Solo son numeros enteros y con decimales{" "}
                </span>
            )}

            <Controller
                name="itbms"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <>
                        <label htmlFor="">itbms</label>
                        <select
                            {...field}
                            className="outline-none p-2 border border-slate-900 rounded-md focus:border-sky-500"
                        >
                            <option value={0}>0</option>
                            <option value={7}>7</option>
                            <option value={10}>10</option>
                        </select>
                    </>
                )}
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
                name="unidad"
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

                        <label htmlFor="">Proveedor</label>
                        <select
                            name=""
                            id=""
                            {...field}
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
                name="area"
                control={control}
                defaultValue=""
                render={({ field }) => (

                    <>

                        <label htmlFor="">Area</label>
                        <select
                            name=""
                            id=""
                            {...field}
                        >
                            <option value=""> </option>
                            {areas?.map((e) => {
                                return (
                                    <option value={e._id} key={e._id}>
                                        {e.nombre}
                                    </option>
                                );
                            })}
                        </select>
                    </>


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

export default FormEditProducto;
