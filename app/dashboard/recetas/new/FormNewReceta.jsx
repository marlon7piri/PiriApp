"use client";
import Spinner from "@/app/components/Spinner";
import DeleteIcon from "@/app/icons/DeleteIcon";
import { UrlWeb } from "@/app/libs/UrlWeb";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";

const FormNewReceta = ({ allproductos }) => {
  const [receta, setReceta] = useState({
    nombre: "",
    productos: [],
    costo: 0,
    restaurante_id: "",
  });
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [productosreceta, setProductosReceta] = useState([]);
  const [costo, setCosto] = useState(0);
  const search = useSearchParams();
  const path = usePathname();
  const router = useRouter();
  const existQuery = search.get("query");

  const buscarProducto = useDebouncedCallback((e) => {
    const params = new URLSearchParams(search);
    const value = e.target.value;

    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }
    params.set("page", 1);
    router.replace(`${path}?query=${value}`);
  }, 300);

  const addProducto = (producto) => {
    setProductosReceta((prevState) => {
      const found = prevState.find((e) => e.id == producto._id);

      if (!found) {
        return [
          ...prevState,
          {
            id: producto._id,
            nombre: producto.nombre,
            costo: producto.costo,
            unidad: producto.unidad,
            cantidad: 0,
            gasto: 0,
          },
        ];
      }

      return prevState;
    });
  };

  const manejarGasto = (cantidad, item) => {
    setProductosReceta((prevState) => {
      const newReceta = prevState.map((ele) =>
        ele.id === item.id
          ? {
              ...ele,
              cantidad: Number(cantidad),
              gasto: Number(item.costo * cantidad).toFixed(2),
            }
          : ele
      );
      setCosto(
        newReceta.reduce((acc, obj) => acc + Number(obj.gasto), 0).toFixed(2)
      );
      return newReceta;
    });
  };

  const prepararReceta = async () => {
    setLoading(true);
    setTimeout(() => {
      const newModel = productosreceta.map((e) => ({
        producto: e.id,
        cantidad: e.cantidad,
      }));

      setReceta({
        nombre: receta.nombre,
        productos: newModel,
        costo: costo,
        restaurante_id: session.user.restaurante_id,
      });
      setLoading(false);
      toast.success("Receta agregada");
    }, 2000);
  };

  const createReceta = () => {
    const sendReceta = async () => {
      const res = await fetch(`${UrlWeb}/recetas`, {
        method: "POST",
        body: JSON.stringify(receta),
      });

      const data = await res.json();
    };

    toast
      .promise(sendReceta(), {
        loading: "Creando...",
        success: "Receta creada",
        error: "Error creando receta, intente nuevamente",
      })
      .catch((error) => {
        throw new Error(`Error creando receta`, error);
      });
  };

  const deleteProductOfRecipe = (id) => {
    setProductosReceta((prevState) => {
      const newRecipe = prevState.filter((y) => y.id !== id);
      setCosto(
        newRecipe.reduce((acc, obj) => acc + Number(obj.gasto), 0).toFixed(2)
      );

      return newRecipe;
    });
  };
  return (
    <div className="w-full h-screen">
      <div className="flex gap-8">
        <form className="flex relative gap-2">
          <div className="flex flex-col gap-2 ">
            <input
              type="text"
              placeholder="Mojito...."
              className="w-full"
              onChange={(e) => setReceta({ ...receta, nombre: e.target.value })}
            />
            <input type="text" onChange={buscarProducto} className="w-full" />
            <ul className="w-fullh-max max-h-[300px] overflow-y-scroll  bg-slate-300 p-2 rounded-md mt-4">
              <li>
                {existQuery &&
                  allproductos.map((e) => (
                    <p
                      key={e._id}
                      onClick={() => addProducto(e)}
                      className="cursor-pointer hover:bg-slate-200"
                    >
                      {e.nombre}
                    </p>
                  ))}
              </li>
            </ul>
          </div>
        </form>

        <div className="flex gap-2 justify-start items-start">
          <table className="w-full h-max  relative text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-slate-900 uppercase bg-sky-500 dark:bg-gray-900 dark:text-gray-400   ">
              <tr>
                <th scope="col" className="px-2 py-3 cursor-pointer">
                  Cantidad
                </th>
                <th scope="col" className="px-6 py-3 cursor-pointer">
                  Producto
                </th>
                <th scope="col" className="px-6 py-3 cursor-pointer">
                  Costo
                </th>
                <th scope="col" className="px-6 py-3 cursor-pointer">
                  Costo por cantidad
                </th>
                <th scope="col" className="px-6 py-3 cursor-pointer">
                  Eliminar
                </th>
              </tr>
            </thead>
            <tbody>
              {productosreceta?.map((item) => {
                return (
                  <tr
                    key={item._id}
                    className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4 ">
                      <input
                        type="text"
                        placeholder="0.56"
                        className="w-[60px]"
                        onChange={(e) => manejarGasto(e.target.value, item)}
                      />
                    </td>
                    <td className="px-6 py-4 ">{item.nombre}</td>
                    <td className="px-6 py-4 ">
                      ${item.costo}/ {item.unidad}
                    </td>
                    <td className="px-6 py-4 ">${item.gasto}</td>
                    <td className="px-6 py-4 ">
                      <button
                        onClick={() => deleteProductOfRecipe(item.id)}
                        type="submit"
                        className="bg-red-500 p-2 rounded-md h-max text-slate-50 hover:bg-red-700"
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <p className=" w-full text-2xl font-semibold">
              Costo de la receta: ${costo}
            </p>
          </table>
          <div className="flex flex-col gap-2">
            <button
              onClick={prepararReceta}
              className="min-w-[100px] bg-sky-500 p-2 rounded-md flex justify-center items-center "
            >
              {loading ? <Spinner /> : "Agregar"}
            </button>
            <button
              disabled={loading}
              onClick={createReceta}
              className="bg-green-500 p-2 rounded-md"
            >
              Crear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormNewReceta;
