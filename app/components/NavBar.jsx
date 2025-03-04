"use client";
import Link from "next/link";
import React, { useCallback } from "react";
import Image from "next/image";
import ProductIcon from "../icons/ProductIcon";
import UserIcon from "../icons/UserIcon";
import LogoutIcon from "../icons/LogoutIcon";
import { signOut } from "next-auth/react";
import HomeIcon from "../icons/HomeIcon";
import { usePathname } from "next/navigation";
import DashboardIcon from "../icons/DashboardIcon";
import InventoryIcon from "../icons/InventoryIcon";

import MermaIcon from "../icons/MermaIcon";
import ProveedorIcon from "../icons/ProveedorIcon";
import AreaIcon from "../icons/AreaIcon";
import { useClientContext } from "../context/ClientProvider";
import RecipeIcon from "../icons/RecipeIcon";

const NavBar = () => {
  const pathname = usePathname();
  const { isVisibleMenu } = useClientContext();

  const fondoLinks = useCallback(
    (links) => {
      const stylespath =
        pathname === links
          ? "w-full flex  items-center gap-2 text-purple-900 font-bold"
          : " w-full flex gap-2 items-center";
      return stylespath;
    },
    [pathname]
  );

  return (
    isVisibleMenu && (
      <nav
        className={`bg-slate-50 border border-slate-950 w-1/4 min-w-[150px] h-screen flex  flex-col  p-4 rounded-md transition duration-500`}
      >
        <Image
          alt="logo al alma"
          src="/wallpaperlogin.svg"
          width={120}
          height={120}
          priority="true"
          className="border border-slate-300 rounded-full p-2 object-cover"
        />
        <ul className="w-full mt-6 flex flex-col gap-4">
          <div className={fondoLinks("/dashboard")}>
            <DashboardIcon />
            <Link href="/dashboard">Dashboard</Link>
          </div>

          <div className={fondoLinks("/dashboard/productos")}>
            <ProductIcon />
            <Link href="/dashboard/productos">Productos</Link>
          </div>
          <div className={fondoLinks("/dashboard/recetas")}>
            <RecipeIcon />
            <Link href="/dashboard/recetas">Recetas</Link>
          </div>
          <div className={fondoLinks("/dashboard/platos")}>
            <RecipeIcon />
            <Link href="/dashboard/platos">Platos</Link>
          </div>
          <div className={fondoLinks("/dashboard/proveedores")}>
            <ProveedorIcon />
            <Link href="/dashboard/proveedores">Proveedores</Link>
          </div>
          <div className={fondoLinks("/dashboard/inventarios")}>
            <InventoryIcon />
            <Link href="/dashboard/inventarios">Inventarios</Link>
          </div>
          <div className={fondoLinks("/dashboard/mermas")}>
            <MermaIcon />
            <Link href="/dashboard/mermas">Mermas</Link>
          </div>
          <div className={fondoLinks("/dashboard/usuarios")}>
            <UserIcon />
            <Link href="/dashboard/usuarios">Usuarios</Link>
          </div>
          <div className={fondoLinks("/dashboard/areas")}>
            <AreaIcon />
            <Link href="/dashboard/areas">Areas</Link>
          </div>
          <div className="flex gap-2">
            <HomeIcon />

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
    )
  );
};

export default NavBar;
