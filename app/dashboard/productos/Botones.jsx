"use client";

import DeleteIcon from "@/app/icons/DeleteIcon";
import EditIcon from "@/app/icons/EditIcon";
import { UrlWeb } from "@/app/libs/UrlWeb";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";



const Botones = ({ allproducto }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();



  const deleteProduct = async () => {
    try {
      if (confirm("Seguro desea eliminar el producto")) {
        setLoading(true);
        const res = await fetch(
          `${UrlWeb}/productos/${allproducto}`,
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
    <div className="w-full flex gap-2 ">
      <Link
        href={`/dashboard/productos/${allproducto}`}
        className="p-2 rounded bg-sky-500 font-medium text-slate-50 dark:text-slate-50 hover:bg-sky-700"
      >
        <EditIcon/>
      </Link>
      <span
        onClick={deleteProduct}
        className="p-2 rounded bg-red-500 font-medium text-slate-50   dark:text-slate-50 hover:bg-red-700 hover:cursor-pointer"
      >
        <DeleteIcon/>
      </span>
    </div>
  );
};

export default Botones;