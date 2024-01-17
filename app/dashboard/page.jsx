"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import styles from "./section.module.css";
import DashboardGrafica from "./DashboardGrafica";
import DashboardTotalProductos from "./DashboardTotalProductos";
import DashboardDineroEnInventario from "./DashboardDineroEnInventario";
import DashboardProductosMasYMenosVendidos from "./DashboardProductosMasYMenosVendidos";
import DashboardProductosCasiAgotados from "./DashboardProductosCasiAgotados";

const page = () => {
  const { data: session } = useSession();

  console.log(session)

 if (!session?.isAdmin) {
    redirect("/home");
  } 

  return (
    <div className="w-full h-screen">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <section className={styles.section}>
        {" "}
        <DashboardGrafica />
        <div className="flex w-full p-4 gap-4"><DashboardTotalProductos/>
        <DashboardDineroEnInventario/></div>
        <DashboardProductosMasYMenosVendidos/>
        <DashboardProductosCasiAgotados/>
      </section>
    </div>
  );
};

export default page;
