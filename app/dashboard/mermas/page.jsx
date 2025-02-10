 "use client";
import React, { useEffect, useState} from "react";
import TablaMermas from "./TablaMermas";
import NavProductos from "../productos/NavProductos";
import FiltrosMermas from "./FiltrosMermas";
import { useClientContext } from "@/app/context/ClientProvider";
import { UrlWeb } from "@/app/libs/UrlWeb";
import { getMermas } from "@/app/libs/actions/mermas/get-mermas";

const Mermas =  () => {
  const [mermas, setMermas] = useState([]);
  const [tablaMermas, setTablaMermas] = useState([]);

  useEffect(() => {
    const obtenerMermas = async () => {
      const data = await getMermas();
      setMermas(data);
      setTablaMermas(data);
    };
    obtenerMermas();
  }, []); 


  return (
    <div className="w-full h-screen ">
      <div className="w-full h-full flex flex-col gap-4 p-4">
        <h1 className="text-3xl font-bold text-center">Mermas</h1>
        <FiltrosMermas
          mermas={mermas}
          tablaMermas={tablaMermas}
         setMermas={setMermas} 
        />
        {/* <TablaMermas mermas={mermas} /> */}
      </div>
    </div>
  );
};

export default Mermas;
