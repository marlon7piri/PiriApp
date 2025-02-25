'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";

const UploadExcel = ({productos}) => {
  const [file, setFile] = useState(null);
  const router = useRouter()

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
    router.refresh()
  };

  return (
    <div className="flex flex-col w-max">
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange}/>
      <button disabled={!productos} onClick={handleUpload} className="w-max bg-green-600 hover:bg-green-900 p-4 rounded-md mt-4">
        Subir Inventario
      </button>
    </div>
  );
};

export default UploadExcel;
