
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const NavBar = () => {
  return (
    <nav className="bg-slate-50 border border-slate-950 w-1/4 h-screen flex place-items-start p-4 rounded-md">
      <ul className="w-full mt-28 flex flex-col gap-8">
        <Link href="/dashboard/productos">Productos</Link>
        <Link href="/dashboard/usuarios">Usuarios</Link>
        <Link href="/home">Home</Link>

       {/*  <Link href="/dashboard/productos">Logout</Link> */}
        <li></li>
      </ul>
    </nav>
  );
};

export default NavBar;
