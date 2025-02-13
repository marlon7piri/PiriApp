import React from 'react'
import Botones from '../productos/Botones';

const TablaRow = ({ categorias }) => {
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
                            <td className="py-4 px-4">fecha</td>



                            <td className="w-max  flex gap-1 justify-center items-center">
                                {/* <Botones allproducto={cat._id} /> */}
                                <button>en desarrollo</button>
                            </td>
                        </tr>
                    );
                })
            )}
        </tbody>
    )
}

export default TablaRow
