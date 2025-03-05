"use client";

import { UrlWeb } from "@/app/libs/UrlWeb";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useClientContext } from "@/app/context/ClientProvider";
import React from "react";
import DeleteIcon from "@/app/icons/DeleteIcon";

const BotonDelete = ({ id }) => {
  const { setLoading } = useClientContext();
  const router = useRouter();

  const deleteItem = async () => {
    try {
      if (confirm("Seguro desea eliminar el item")) {
        setLoading(true);
        const res = await fetch(`${UrlWeb}/item/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();

        if (!res.ok) {
          toast.error("algo salio mal");
        }

        toast.success("Item eliminado");
        router.refresh();

        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <button
      onClick={deleteItem}
      className=" rounded-md p-2 bg-red-500 font-medium text-slate-50 dark:text-slate-50 hover:bg-red-700"
    >
      <DeleteIcon />
    </button>
  );
};

export default BotonDelete;
