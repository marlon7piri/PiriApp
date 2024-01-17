'use client'

import React, { useEffect } from 'react'
import TablaMermas from './TablaMermas'
import NavProductos from '../productos/NavProductos'
import FiltrosMermas from './FiltrosMermas'
import { useClientContext } from '@/app/home/context/ClientProvider'
import { UrlWeb } from '@/app/libs/UrlWeb'

const Mermas = () => {
  const {setTablademermas,setMermas,tablademermas,mermas} = useClientContext()


  
  useEffect (() => {
    const getMermas = async () => {
      const res = await fetch(`${UrlWeb}/mermas`);
      const data = await res.json();
      setMermas(data);
      setTablademermas(data);
    };
    getMermas();
  });
  return (
    <div className='w-full h-screen '>
      <div className='w-full h-full flex flex-col gap-4 p-4'>
      <h1 className="text-3xl font-bold text-center">Mermas</h1>
      <NavProductos/>
      <FiltrosMermas tablademermas={tablademermas} mermas={mermas}/>
      <TablaMermas tablademermas={tablademermas} mermas={mermas}/>
      </div>
    </div>
  )
}

export default Mermas