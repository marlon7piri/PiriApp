"use client";

import { useEffect, useState } from "react";
import DashboardTotalProductos from "./DashboardTotalProductos";
import DashboardDineroEnInventario from "./DashboardDineroEnInventario";
import DashboardProductosMasYMenosVendidos from "./DashboardProductosMasYMenosVendidos";
import DashboardProductosCasiAgotados from "./DashboardProductosCasiAgotados";
import { UrlWeb } from "@/app/libs/UrlWeb";
import styles from "./section.module.css"
import Loading from "./loading";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const [estadisticas, setEstadisticas] = useState(null);
  const { data: session } = useSession()
 
  useEffect(() => {
    const fetchEstadisticas = async () => {
      try {
        if (session) {
          const res = await fetch(
            `${UrlWeb}/estadisticas/${session?.user?.restaurante_id}`,
            { cache: "no-cache" }
          );
  
          if (!res.ok) {
            throw new Error(`Error en la API: ${res.status}`);
          }
  
          const data = await res.json();
          setEstadisticas(data);
        }
      } catch (error) {
        console.error("Error al cargar estadísticas:", error);
      }
    };
  
    fetchEstadisticas();
  }, [session]); // Asegúrate de incluir `session` como dependencia

  if (!estadisticas) {
    return <Loading />;
  }

  return (
    <div className="w-full h-screen">
      <h1 className="text-3xl font-bold text-center my-6 text-slate-800">Dashboard</h1>
      <section className={styles.section}>
        <DashboardTotalProductos cantidadProductos={estadisticas.cantidadProductos} />
        <DashboardDineroEnInventario dineroTotal={estadisticas.dineroTotal} />
        <DashboardProductosMasYMenosVendidos productosMasVendidos={estadisticas.productosMasVendidos} />
        <DashboardProductosCasiAgotados productosAgotados={estadisticas.productosAgotados} />
      </section>
    </div>
  );
};

export default Dashboard;
