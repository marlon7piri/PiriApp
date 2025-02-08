'use client'
import { useState } from "react";

const UploadExcel = () => {
  const [file, setFile] = useState(null);

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
  };

  return (
    <div className="w-[300px]">
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button onClick={handleUpload}>Subir y Actualizar Inventario</button>
    </div>
  );
};

export default UploadExcel;
