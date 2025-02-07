import React, { cache } from "react";
import { redirect } from "next/navigation";
import styles from "./section.module.css";
import DashboardTotalProductos from "./DashboardTotalProductos";
import DashboardDineroEnInventario from "./DashboardDineroEnInventario";
import DashboardProductosMasYMenosVendidos from "./DashboardProductosMasYMenosVendidos";
import DashboardProductosCasiAgotados from "./DashboardProductosCasiAgotados";
import { UrlWeb } from "../libs/UrlWeb";
import DashboardGrafica from "./DashboardGrafica";


const loadEstadisticas = async ()=>{
  const res = await fetch(`${UrlWeb}/estadisticas`,{cache:'no-cache'})
  const data = await res.json()

 
  return data
}

const page = async () => {
  

  const {cantidadProductos,productosAgotados,dineroTotal,productosMasVendidos} = await loadEstadisticas()

 
  return (
    <div className="w-full h-screen">
      <h1 className="text-3xl font-bold text-center my-6 text-slate-800">
        Dashboard
      </h1>

      <section className={styles.section}>
        {" "}
    {/*    <DashboardGrafica /> */}

          <DashboardTotalProductos cantidadProductos={cantidadProductos}/>
          <DashboardDineroEnInventario dineroTotal={dineroTotal}/>
       
        <DashboardProductosMasYMenosVendidos productosMasVendidos={productosMasVendidos}/>
        <DashboardProductosCasiAgotados productosAgotados={productosAgotados}/>
      </section>
    </div>
  );
};

export default page;
