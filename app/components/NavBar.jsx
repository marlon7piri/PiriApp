"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import ProductIcon from "../icons/ProductIcon";
import UserIcon from "../icons/UserIcon";
import LogoutIcon from "../icons/LogoutIcon";
import { signOut } from "next-auth/react";
import HomeIcon from "../icons/HomeIcon";
import { usePathname} from "next/navigation";
import DashboardIcon from "../icons/DashboardIcon";
import MermaIcon from "../icons/MermaIcon";

const NavBar = () => {

  const pathname= usePathname()


  const fondoLinks =(links)=>{
    const stylespath  = pathname ===links ? "w-full flex gap-2 text-sky-900 font-bold" : " w-full flex gap-2" 
    return stylespath

  } 

  return (
    <nav className="bg-slate-50 border border-slate-950 w-1/4 h-screen flex  flex-col  p-4 rounded-md">
      <Image
        alt="logo al alma"
        src="/logo.jpg"
        width={120} priority='true'
        height={120}
        className=" rounded-full p-2 "
      />
      <ul className="w-full mt-6 flex flex-col gap-4">
      <div className={fondoLinks("/dashboard")}>
          {" "}
          <DashboardIcon />
          <Link href="/dashboard">Dashboard</Link>
        </div>
        <div className={fondoLinks("/dashboard/productos")}>
          {" "}
          <ProductIcon />
          <Link href="/dashboard/productos">Productos</Link>
        </div>
        <div className={fondoLinks("/dashboard/productos")}>
          {" "}
          <ProductIcon />
          <Link href="/dashboard/inventarios">Inventarios</Link>
        </div>
        <div className={fondoLinks("/dashboard/mermas")}>
          {" "}
          <MermaIcon />
          <Link href="/dashboard/mermas">Mermas</Link>
        </div>
        <div className={fondoLinks("/dashboard/usuarios")}>
          <UserIcon />
          <Link href="/dashboard/usuarios">Usuarios</Link>
        </div>

        <div className="flex gap-2">
          {" "}
          <HomeIcon />{" "}
         
          <Link href="/home">Home</Link>
        </div>
        <div className="flex gap-2">
        <LogoutIcon />
          <button className="w-max" onClick={() => signOut()}>
            Logout
          </button>
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
