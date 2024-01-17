"use client";

import { useClientContext } from "@/app/home/context/ClientProvider";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const FiltrosMermas = ({tablademermas,mermas}) => {
  const {  setMermas } = useClientContext();
  const [fecha, setFecha] = useState("");
  const router = useRouter();

  const handlerChange = (e) => {
    setFecha(e.target.value);
  };
  const filtrar = () => {

    const result = tablademermas.filter((merma) => {
      return merma.fecha === fecha;
    });
    setMermas(result);
  };

  return (
    <div>
     <form >
     <input type="date" onChange={handlerChange} />
      <button onClick={filtrar}>Filtrar</button>
     </form>
    </div>
  );
};

export default FiltrosMermas;
