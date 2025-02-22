"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { UrlWeb } from "@/app/libs/UrlWeb";
import styles from "./styles.module.css"
import { useDebouncedCallback } from "use-debounce";
import { useSession } from "next-auth/react";

const schema = yup
  .object({
    nombre: yup.string().max(200),
    cantidad: yup.number().positive().required(),
    causa: yup.string().required(),
    fecha: yup.string().required(),
    observaciones: yup.string().required(),
  })
  .required();




const FormMermas = ({ productos }) => {
  const router = useRouter();
  const { data: session } = useSession()

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [idSelected, setIdSelected] = useState({

  })
  const [termino, setTermino] = useState('')
  const [closelist, setCloselist] = useState(true)
  const searchparams = useSearchParams()
  const path = usePathname()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isLoading },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const enviarData = async (data) => {

console.log({idSelected})
    if (!idSelected?.nombre) {
      alert('Debe seleccionar un producto')
      return
    }
    try {
      setLoading(true);
      const res = await fetch(`${UrlWeb}/mermas`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...data,
          nombre: idSelected.nombre,
          id: idSelected.id,
          autor: session?.user?.id,
          restaurante_id: session?.user?.restaurante_id
        }),
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
    setTermino(product.nombre)
    setCloselist(true)
  }

  const handlerChange = useDebouncedCallback((e) => {

    const params = new URLSearchParams(searchparams)

    const nombre = e.target.value


    if (params) {
      params.set('query', nombre)
      setCloselist(false)
    } else {
      params.delete('query')
    }
    router.replace(`${path}?${params}`)

  }, 300)

  return (
    <div>


      <form
        onSubmit={handleSubmit(enviarData)}
        className={styles.form}
      >



        {error && <span className="bg-red-500 text-white p-2">{error}</span>}
        <input

          value={termino}
          onChange={(e) => {
            setTermino(e.target.value); // Actualiza inmediatamente el estado
            handlerChange(e); // Luego llama a la función debounced
          }}

          /*  {...register("nombre", { required: false })} */
          placeholder="Buscar producto"
        />
        {(!closelist && termino) && (<ul className="bg-slate-200 h-[100px] overflow-y-scroll">
          {productos.map((e) => {
            return <li
              className="cursor-pointer hover:bg-sky-500  p-2"
              value={e._id}
              key={e._id}
              onClick={() => selectProduct(e)}>{e.nombre}</li>;

          })}
        </ul>)}

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
            <input


              {...register("causa", { required: true })}


              placeholder="causa"
            />
            {errors.causa && (
              <span className="text-red-500">Es requerido</span>
            )}


            <label htmlFor="">Fecha</label>

            <input type="date" {...register("fecha", { required: true })} />
            {errors.fecha && (
              <span className="text-red-500"> La fecha es requerida</span>
            )}
          </div>
          <div className="w-full h-auto ">
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
          disabled={isLoading}
          type="submit"
          value={loading ? " loading..." : "Crear"}
          className="bg-sky-500 px-4 py-2 rounded-md text-slate-900 hover:bg-sky-900 transition duration-500 hover:text-slate-50 cursor-pointer"
        />
      </form>
    </div>
  );
};

export default FormMermas;
