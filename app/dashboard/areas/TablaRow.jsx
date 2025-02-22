import React, { useState } from 'react'
import Botones from '../productos/Botones';
import { convertidordefecha } from '@/app/libs/convertidordefecha';
import EditIcon from '@/app/icons/EditIcon';
import DeleteIcon from '@/app/icons/DeleteIcon';
import { useRouter } from 'next/navigation';
import { UrlWeb } from '@/app/libs/UrlWeb';
import toast from 'react-hot-toast';
import Link from 'next/link';

const TablaRow = ({ categorias }) => {

    const [loading, setLoading] = useState(false);
    const router = useRouter();


    const deleteArea = async (id) => {
        try {
            if (confirm("Seguro desea eliminar el área")) {
                setLoading(true);
                const res = await fetch(`${UrlWeb}/areas/${id}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                });

                toast.success("Área eliminada");
                router.refresh();

                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };
    return (
        <tbody className=''>
            {categorias?.length === 0 ? (
                <h1 className="w-full   text-center text-2xl text-slate-900">
                    No hay productos
                </h1>
            ) : (
                categorias?.map((cat) => {
                    return (
                        <tr
                            className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            key={cat._id}
                        >
                            <td className="py-4  px-4">{cat.nombre}</td>
                            <td className="py-4 px-4">{convertidordefecha(cat.createdAt)}</td>



                            <td>
                            <div className="w-full h-max flex gap-2 ">
                                    <Link
                                        href={`/dashboard/areas/${cat._id}`}
                                        className="flex justify-center items-center px-2 py-1 rounded bg-sky-500 font-medium text-slate-50 dark:text-slate-50 hover:bg-sky-700"
                                    >
                                        <EditIcon />
                                    </Link>
                                    <button
                                        onClick={() => deleteArea(cat._id)}
                                        className="px-2 py-1 rounded bg-red-500 font-medium text-slate-50   dark:text-slate-50 hover:bg-red-700 hover:cursor-pointer"
                                    >
                                        <DeleteIcon />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    );
                })
            )}
        </tbody>
    )
}

export default TablaRow
