"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const url ="https://clone-invu-app.vercel.app/api"


const Botones = ({ allproducto }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();



  const deleteProduct = async () => {
    try {
      if (confirm("Seguro desea eliminar el producto")) {
        setLoading(true);
        const res = await fetch(
          `${url}/productos/${allproducto}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        );

      
          toast.success("Producto eliminado");
          router.refresh();
       

        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="w-full flex">
      <Link
        href={`/dashboard/productos/${allproducto}`}
        className="px-4 py-1 rounded bg-sky-500 font-medium text-slate-900 dark:text-blue-500 hover:bg-sky-700"
      >
        edit
      </Link>
      <span
        onClick={deleteProduct}
        className="px-4 py-1 rounded bg-red-500 font-medium text-slate-900   dark:text-blue-500 hover:bg-red-700 hover:cursor-pointer"
      >
        eliminar
      </span>
    </div>
  );
};

export default Botones;