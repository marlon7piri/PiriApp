"use client";
import DeleteIcon from "@/app/icons/DeleteIcon";
import EditIcon from "@/app/icons/EditIcon";
import { UrlWeb } from "@/app/libs/UrlWeb";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const TablaOFUsers = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const deleteProduct = async (id) => {
    try {
      if (confirm("Seguro desea eliminar el producto")) {
        setLoading(true);
        const res = await fetch(`${UrlWeb}/usuarios/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });

        toast.success("Usuario eliminado");
        router.refresh();

        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <>
      {data?.map((e) => {
        return (
          <tr className=" mt-4    " key={e._id}>


            <td className=" flex gap-2 items-center px-6 py-4 font-medium " scope="row">

              <span className='w-8 h-8 text-slate-50 flex justify-center items-center p-2 rounded-full bg-red-500'
                
              >
                {e.username?.substring(0, 2)}
              </span>
              <span>{e.username}</span>
            </td>

            <td className="px-6 py-4">{e.email}</td>
            <td className="px-6 py-4">{e.phone}</td>
            {/*   <td className="px-6 py-4">{e.address}</td> */}
            <td className="px-6 py-4">
              {(e.isAdmin === true ? "admin" : "client").toString()}
            </td>
            <td
              className={
                e.isActive === true
                  ? `text-green-500 px-6 py-4`
                  : `text-red-500 px-6 py-4`
              }
            >
              {(e.isActive === true ? "activo" : "inactivo").toString()}
            </td>

            <td className="  flex gap-1 justify-center items-center">

              <Link
                href={e._id == '659ec0bcb3d436824aff3ac0'? '/dashboard/usuarios' : `/dashboard/usuarios/${e._id}`}
                className="px-2 py-2 rounded bg-sky-500 font-medium text-slate-900 dark:text-blue-500 hover:bg-sky-700"
              >
                <EditIcon />
              </Link>

              <button
                
                onClick={() => alert('Funcion desabilitada por seguridad')/* () => deleteProduct(e._id) */}
                className="px-2 py-2 rounded bg-red-500 font-medium text-slate-900   dark:text-blue-500 hover:bg-red-700"
              >
                <DeleteIcon />
              </button>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default TablaOFUsers;
