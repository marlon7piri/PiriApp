'use client'
import { UrlWeb } from '@/app/libs/UrlWeb';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const TablaOFUsers = ({data}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();




  const deleteProduct = async (id) => {
    try {
      if (confirm("Seguro desea eliminar el producto")) {
        setLoading(true);
        const res = await fetch(
          `${UrlWeb}/usuarios/${id}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        );

      
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
    {  data?.map((e) => {
        return (
          
          <tr
            className=" mt-4    "
            key={e.id}
          >
            <th
              scope="row"
              className=" px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <span
                style={{
                  width: "20px",
                  height: "20px",
                  fontWeigth: "black",
                  color: "white",
                  padding: "10px",
                  borderRadius: "50%",
                  backgroundColor: "red",
                }}
              >
                {e.username?.substring(0, 2)}
              </span>{" "}
              {e.username}
            </th>
            <td className="px-6 py-4">{e.email}</td>
            <td className="px-6 py-4">{e.phone}</td>
          {/*   <td className="px-6 py-4">{e.address}</td> */}
            <td className="px-6 py-4">
              {(e.isAdmin === true ? "admin" : "client").toString()}
            </td>
            <td className={e.isActive === true ? `text-green-500 px-6 py-4` : `text-red-500 px-6 py-4` }>
              {(e.isActive === true ? "activo" : "inactivo").toString()}
            </td>

            <td className="px-2 py-2  flex gap-1 justify-center items-center">
              <Link
                href={`/dashboard/usuarios/${e._id}`}
                className="px-4 py-1 rounded bg-sky-500 font-medium text-slate-900 dark:text-blue-500 hover:bg-sky-700"
              >
                Edit
              </Link>
             
                  <button onClick={()=>deleteProduct(e._id)} className="px-4 py-1 rounded bg-red-500 font-medium text-slate-900   dark:text-blue-500 hover:bg-red-700">
                Delete
              </button>
           
              
            </td>
          </tr>
          )
      })}
      </>)
      
}

export default TablaOFUsers