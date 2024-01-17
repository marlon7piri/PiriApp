"use client";

import { useClientContext } from "@/app/home/context/ClientProvider";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const FiltrosMermas = () => {
  const { mermas, setMermas } = useClientContext();
  const [fecha, setFecha] = useState("");
  const router = useRouter();

  const handlerChange = (e) => {
    setFecha(e.target.value);
  };
  const filtrar = () => {
    console.log(fecha);
    const result = mermas.filter((merma) => {
      return merma.fecha === fecha;
    });
    console.log(result);
    setMermas(result);
    router.refresh();
  };

  return (
    <div>
      <input type="date" onChange={handlerChange} />
      <button onClick={filtrar}>Filtrar</button>
    </div>
  );
};

export default FiltrosMermas;
