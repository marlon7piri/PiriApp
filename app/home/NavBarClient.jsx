"use client";

import Link from "next/link";
import React, { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

const NavBarClient = () => {
  const [cambiarclase, setCambiarclase] = useState(false);
  const { back } = useRouter();
  const { data: session } = useSession();

  const showMenu = () => {
    document.getElementById("menu").classList.toggle("show_menu");
    setCambiarclase(!cambiarclase);
  };
  return (
    <div className="nav_container">
      <div className=" w-full h-full flex  bg-negro justify-between p-3 text-blanco ">
      <div className="flex gap-4 justify-center items-center">
        <Image
          alt="logo al alma"
          src="/logo.jpg"
          width={60}
          height={60}
          priority="true"
          className="border border-slate-300 rounded-full p-2 object-cover"
        />
        <span className="text-slate-900">Bienvenido {session?.username}</span>
      </div>
      <div className="navbar_container">
        <ul className="menu" id="menu">
          <button
            onClick={() => {
              back();
            }}
          >
            Regresar
          </button>
          <Link href="/home/pedidos" onClick={showMenu}>
            Pedidos
          </Link>
          {!session ? (
            <Link href="/login" onClick={showMenu}>
              Login
            </Link>
          ) : (
            <button
              onClick={() => {
                signOut();
                redirect("/login");
              }}
            >
              Logout
            </button>
          )}
          {session?.isAdmin ? (
            <Link href="/dashboard" onClick={showMenu}>
              Dashboard
            </Link>
          ) : (
            ""
          )}
        </ul>
      </div>
      <div>
        {!cambiarclase ? (
          <span className="boton_hamburguesa" onClick={() => showMenu()}>
            open
          </span>
        ) : (
          <span className="boton_hamburguesa_close" onClick={() => showMenu()}>
           close
          </span>
        )}
      </div>
      </div>
    </div>
  );
};

export default NavBarClient;
