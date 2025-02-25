'use client'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import BotonEXCEL from "./BotonEXCEL";
import BotonPDF from "./BotonPDF";

const UploadExcel = ({ productos }) => {
  const [file, setFile] = useState(null);
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Selecciona un archivo");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/inventario/uploadExcel", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert(data.message);
    router.refresh();
  };

  // Estado para controlar si mostrar todos
  const [mostrarTodos, setMostrarTodos] = useState(false);

  useEffect(() => {
    // Verificar si "allData" existe en los parámetros de la URL y actualizar el estado
    if (searchParams.has('allData') && searchParams.get('allData') === 'si') {
      setMostrarTodos(true);
    }
  }, [searchParams]);

  const handleToggleAllData = () => {
    const params = new URLSearchParams(searchParams); // Obtener los parámetros actuales
    const newState = !mostrarTodos; // Cambiar el estado

    if (newState) {
      params.set("allData", "si"); // Si es true, agregar allData=si
    } else {
      params.delete("allData"); // Si es false, eliminar allData
    }

    setMostrarTodos(newState);

    // Actualizar la URL sin recargar la página
    router.replace(`${path}?${params}`);
  };

  return (
    <div className="flex flex-col w-max">
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />

      <div className="flex gap-2 justify-start items-center">
        <button disabled={!productos} onClick={handleUpload} className="w-max bg-green-600 hover:bg-green-900 p-4 rounded-md mt-4">
          Subir Inventario
        </button>
        <BotonEXCEL productos={productos} />
        <BotonPDF productos={productos} />
        <label htmlFor="">Todos:</label>
        <input
          type="checkbox"
          checked={mostrarTodos}
          onChange={handleToggleAllData}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default UploadExcel;
