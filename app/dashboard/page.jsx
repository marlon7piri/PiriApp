"use client";
import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import styles from "./section.module.css";
import DashboardGrafica from "./DashboardGrafica";
import DashboardTotalProductos from "./DashboardTotalProductos";
import DashboardDineroEnInventario from "./DashboardDineroEnInventario";
import DashboardProductosMasYMenosVendidos from "./DashboardProductosMasYMenosVendidos";
import DashboardProductosCasiAgotados from "./DashboardProductosCasiAgotados";
import { useClientContext } from "../context/ClientProvider";

const page = () => {
  const { data: session } = useSession();
  const { avisodecorreo } = useClientContext();

  console.log(session);

 /* useEffect(()=>{
    localStorage.setItem('sesion',session)
  },[])

   if (!session?.isAdmin) {
    redirect("/home");
  } */
/* 
  const timer = 5000;
  useEffect(() => {
    const intervalo = setInterval(() => {
      alertadeCorreoNoEnviado();

      clearInterval(intervalo);
    }, timer);
  }, []);

  const alertadeCorreoNoEnviado = () => {
    if (!avisodecorreo) {
      alert("Hay productos agotados, revisalos");
    }
  }; */

  return (
    <div className="w-full h-screen">
      <h1 className="text-3xl font-bold text-center my-6 text-slate-800">
        Dashboard
      </h1>

      <section className={styles.section}>
        {" "}
        <DashboardGrafica />
        <div className="flex w-full p-4 gap-4">
          <DashboardTotalProductos />
          <DashboardDineroEnInventario />
        </div>
        <DashboardProductosMasYMenosVendidos />
        <DashboardProductosCasiAgotados />
      </section>
    </div>
  );
};

export default page;
