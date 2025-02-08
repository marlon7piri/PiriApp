



import React from 'react'
import * as XLSX from 'xlsx';
import ExcelIcon from '../icons/ExcelIcon';

const BotonEXCEL = ({ productos }) => {
  const filteredData = productos.map(product => ({
    id: product._id,
    nombre: product.nombre,
    stock: product.stock,
    unidad: product.unidad,
    precio_por_unidad: product.precio_por_unidad
  }));
  const downloadInventory = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Inventory');
    XLSX.writeFile(wb, 'inventory.xlsx');
  };

  return (
    <button
      onClick={downloadInventory}
      className="flex gap-2 justify-center items-center bg-green-700 w-max h-16 p-4 text-slate-50 rounded-md hover:bg-green-900 "
    >
      <ExcelIcon />
    </button>
  )
}

export default BotonEXCEL