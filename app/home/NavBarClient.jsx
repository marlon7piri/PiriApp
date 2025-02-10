"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { RxHamburgerMenu } from "react-icons/rx";

import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { useClientContext } from "../context/ClientProvider";

const NavBarClient = () => {
  const { setSession } = useClientContext()
  const [cambiarclase, setCambiarclase] = useState(false);
  const { back } = useRouter();
  const { data: session } = useSession();

  const showMenu = () => {
    document.getElementById("menu").classList.toggle("show_menu");
    setCambiarclase(!cambiarclase);
  };

  useEffect(() => {

    setSession(session);


  }, [])


  const backFunction = () => {
    back();
    document.getElementById("menu").classList.toggle("show_menu");
    setCambiarclase(!cambiarclase);
  };
  return (
    <div className="nav_container">
      <div className=" w-full h-full flex  justify-between p-4  items-center ">
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
            <Link href="/home" onClick={showMenu}>
              Home
            </Link>
            <Link href="/home/pedidos" onClick={showMenu}>
              Pedidos
            </Link>
            {session?.isAdmin ? (
              <Link href="/dashboard" onClick={showMenu}>
                Dashboard
              </Link>
            ) : (
              ""
            )}
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
          </ul>
        </div>

        {!cambiarclase ? (
          <span className="boton_hamburguesa" onClick={() => showMenu()}>
            <RxHamburgerMenu />
          </span>
        ) : (
          <span className="boton_hamburguesa_close" onClick={() => showMenu()}>
            <IoClose />
          </span>
        )}
      </div>
    </div>
  );
};

export default NavBarClient;
