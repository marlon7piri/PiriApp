"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UrlWeb } from "@/app/libs/UrlWeb";
import { useClientContext } from "@/app/context/ClientProvider";
import styles from"./styles.module.css"

const schema = yup
  .object({
    nombre: yup.string().max(200),
    cantidad: yup.number().positive().required(),
    fecha: yup.string().required(),
    observaciones: yup.string().required(),
  })
  .required();

const causas = [
  "Devolucion del cliente",
  "Error al hacer el pedido",
  "Error de cocina",
  "accidente",
  "caducidad",
  "otro motivo(especificar)",
];
const servicios = ["apertura", "cierre"];

const FormMermas = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [idSelected, setIdSelected] = useState({

  })
  const { totalProductos } = useClientContext();
  const [productosfilter, setProductosfilter] = useState(totalProductos);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isLoading },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const enviarData = async (data) => {



    try {
      setLoading(true);
      const res = await fetch(`${UrlWeb}/mermas`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify({ ...data, nombre: idSelected.nombre, id: idSelected.id }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message);
        setLoading(false);
      } else {
        setLoading(false);

        toast.success("Merma creada");
        reset();
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectProduct = (product) => {
    setIdSelected({ id: product._id, nombre: product.nombre })

  }

  const handlerChange = (e) => {

    const nombre = e.target.value

    const productsfound = totalProductos.map(i => {
      return i.nombre.toLowerCase().includes(nombre.toLowerCase()) ? i : totalProductos

    })
    setProductosfilter(productsfound)
    setIdSelected({ ...idSelected, nombre: nombre })



  }
  return (
    <form
      onSubmit={handleSubmit(enviarData)}
      className="flex flex-col m-auto p-4 w-2/4  gap-4 mt-28"
    >
      {error && <span className="bg-red-500 text-white p-2">{error}</span>}
      <input
        list="productos"
        value={idSelected?.nombre}
        onChange={handlerChange}

        {...register("nombre", { required: false })}
        placeholder="nombre"
      />
      {<ul className="bg-slate-200 h-[100px] overflow-y-scroll">
        {productosfilter.map((e) => {
          return <li
            className="cursor-pointer hover:bg-slate-300  p-2"
            value={e._id}
            key={e._id}
            onClick={() => selectProduct(e)}>{e.nombre}</li>;

        })}
      </ul>}

      {errors.nombre && (
        <span className="text-red-500">
          {" "}
          El nombre es requerido y tiene que ser maximo 20 caracteres
        </span>
      )}

      <input
        type="text"
        {...register("cantidad", { required: true })}
        placeholder="cantidad"
      />
      {errors.cantidad && (
        <span className="text-red-500"> Solo son numeros del 0 al 9</span>
      )}

      <div className={styles.containerTextArea}>

        <div className="flex flex-col gap-2">
          <label htmlFor="">Causa</label>
          <select
            name=""
            id=""
            {...register("causa", { required: true })}
            className="p-2 outline-none cursor-pointer"
          >
            <option value=""> </option>
            {causas?.map((e) => {
              return (
                <option value={e} key={e}>
                  {e}
                </option>
              );
            })}
          </select>

          <label htmlFor="">Servicios</label>
          <select
            name=""
            id=""
            {...register("servicio", { required: true })}
            className="p-2 outline-none cursor-pointer"
          >
            <option value=""> </option>
            {servicios?.map((e) => {
              return (
                <option value={e} key={e}>
                  {e}
                </option>
              );
            })}
          </select>
          <label htmlFor="">Fecha</label>

          <input type="date" {...register("fecha", { required: true })} />
          {errors.fecha && (
            <span className="text-red-500"> La fecha es requerida</span>
          )}
        </div>
        <div className="w-full h-full">
          <textarea
            rows={4}
            className="resize-none p-2 w-full h-full"
            type="text"
            {...register("observaciones", { required: true })}
            placeholder="observaciones"
          />
          {errors.address && (
            <span className="text-red-500"> La direccion es requerida</span>
          )}
        </div>

      </div>

      <input
        /*   disabled={isLoading} */
        type="submit"
        value={loading ? " loading..." : "Crear"}
        className="bg-sky-500 px-4 py-2 rounded-md text-slate-900 hover:bg-sky-900 transition duration-500 hover:text-slate-50 cursor-pointer"
      />
    </form>
  );
};

export default FormMermas;
