"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { DeviconFaunadb } from "../icons/Logo";

const NavBarClient = () => {
  const { back } = useRouter();

  return (
    <nav className="bg-slate-50 w-full flex justify-between  items-center p-4">
      <DeviconFaunadb />
      <ul className=" flex gap-4">
        <button onClick={() => back()}>Regresar</button>
        <Link href="/home/pedidos">Pedidos</Link>
        {/* <Link href="/dashboard/productos">Logout</Link>  */}
      </ul>
    </nav>
  );
};

export default NavBarClient;
