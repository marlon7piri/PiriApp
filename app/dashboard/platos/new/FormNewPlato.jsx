"use client";
import FiltroBusqueda from "@/app/components/FiltroBusqueda";
import Spinner from "@/app/components/Spinner";
import DeleteIcon from "@/app/icons/DeleteIcon";
import { UrlWeb } from "@/app/libs/UrlWeb";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";
import * as yup from "yup";

const yupSchema = yup.object({
  nombre: yup.string().required("El nombre es requerido").trim(),
  descripcion: yup.string(),
  /* precio: yup
    .number()
    .typeError("El precio tiene que ser un numero")
    .min(0, "El precio tiene que ser mayor a 0")
    .positive("El precio tiene que ser un numero positivo")

    .required("El precio es requerido"), */
});
const FormNewPlato = ({ recetas }) => {
  const { data: session } = useSession();
  const [isListClose, setIsListClose] = useState(true);
  const [error, setError] = useState(null);
  const [precio, setPrecio] = useState(0);
  const [recetasSelected, setRecetasSelected] = useState([]);
  const [foodCost, setFoodCost] = useState(0);
  const search = useSearchParams();
  const query = search.get("query");
  const router = useRouter();
  const path = usePathname();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,

    reset,
    formState: { errors, isLoading, isSubmitting },
  } = useForm({
    resolver: yupResolver(yupSchema),
  });

  const buscarReceta = useDebouncedCallback((e) => {
    const params = new URLSearchParams(search);
    let termino = e.target.value;
    termino = termino.replace(/[^a-zA-Z0-9\s]/g, "");

    if (termino) {
      params.set("query", termino);
      setIsListClose(false);
    } else {
      params.delete("query");
    }

    router.replace(`${path}?${params}`);
  }, 300);

  const selectReceta = (item) => {
    setIsListClose(!isListClose);
    setRecetasSelected((prevState) => {
      const exist = prevState.find((r) => r.id == item._id);
      if (!exist) {
        return [
          ...prevState,
          { id: item._id, nombre: item.nombre, costo: item.costo },
        ];
      }
      return prevState;
    });
  };

  const deleteRecetaList = (id) => {
    setRecetasSelected((prevState) => {
      const filtered = prevState.filter((y) => y.id !== id);

      setFoodCost(foodCost - foodCost);

      return filtered;
    });
  };
  const handlerPrice = (e) => {
    let valor = e.target.value;
    setPrecio(valor);

    // Validación manual
    if (isNaN(valor) || valor <= 0) {
      setError("El precio debe ser un número positivo mayor que 0");
      setFoodCost(0);
      return;
    }

    // Calcular el Food Cost si el precio es válido
    const costo = recetasSelected.reduce((acc, obj) => {
      return acc + (obj.costo / valor) * 100;
    }, 0);

    setFoodCost(costo);
    setError("");
  };

  const enviarData = async (data, e) => {
    e.preventDefault();

    if (recetasSelected.length == 0) {
      toast.error("Tiene que seleccionar al menos una receta");
      return;
    }
    if (foodCost == 0) {
      setError("Tiene que determinar el food cost del plato");
      return;
    }

    const send = async () => {
      let ids = recetasSelected.map((t) => t.id);

      try {
        const res = await fetch(`${UrlWeb}/item`, {
          method: "POST",
          body: JSON.stringify({
            ...data,
            precio: precio,
            ingredientes: ids,
            restaurante_id: session.user?.restaurante_id,
          }),
        });

        const result = await res.json();

        if (result.status == 201) {
          setRecetasSelected([]);
          reset();
          setError("");
          router.push("/dashboard/platos");
          router.refresh();
        }
      } catch (error) {
        throw new Error("Error creando el item", error);
      }
    };

    await toast.promise(send(), {
      loading: "Creando...",
      success: "Item creado",
      error: "Algo sucedión, intente nuevamente",
    });
  };

  return (
    <form
      className="w-2/4 min-w-[400px] mx-auto flex flex-col gap-2 bg-slate-50 rounded-md shadow-2xl p-4"
      onSubmit={handleSubmit(enviarData)}
    >
      <input
        type="text"
        placeholder="Nombre"
        name="nombre"
        {...register("nombre", { required: true })}
      />
      {errors.nombre && (
        <p className="text-red-500 font-bold">{errors.nombre.message}</p>
      )}
      <input
        type="text"
        placeholder="Descripcion"
        name="descripcion"
        {...register("descripcion")}
      />
      {errors.descripcion && <p className="text-red-500 font-bold"></p>}

      <div className=" w-full relative">
        <input
          type="text"
          onChange={buscarReceta}
          placeholder="Buscar receta"
          className="w-full"
        />
        <ul className="w-full absolute top-10 bg-slate-300  max-h-[100px] overflow-y-scroll">
          {query &&
            !isListClose &&
            recetas?.map((e) => (
              <li
                key={e._id}
                onClick={() => selectReceta(e)}
                className="hover:bg-slate-500 cursor-pointer pl-1"
              >
                {e.nombre} -${e.costo}
              </li>
            ))}
        </ul>
      </div>

      <ul>
        {recetasSelected.length == 0 ? (
          <p>No hay recetas seleccionadas</p>
        ) : (
          recetasSelected.map((e) => (
            <li key={e.id} className="flex justify-between pb-1">
              {e.nombre} -${e.costo}
              <span
                onClick={() => deleteRecetaList(e.id)}
                className="bg-red-500 p-2 rounded-md hover:bg-red-700 cursor-pointer"
              >
                <DeleteIcon />
              </span>
            </li>
          ))
        )}
      </ul>
      <input
        type="text"
        placeholder="Precio"
        name="precio"
        value={precio}
        onChange={handlerPrice}
      />

      <p className="text-red-500 font-bold">{error}</p>

      <span>Food Cost: %{foodCost?.toFixed(2)}</span>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`flex justify-center items-center ${
          isSubmitting
            ? "bg-slate-500 cursor-not-allowed"
            : "bg-sky-500 hover:bg-sky-700"
        } rounded-md w-full p-4`}
      >
        {isSubmitting ? <Spinner /> : "Crear"}
      </button>
    </form>
  );
};

export default FormNewPlato;
