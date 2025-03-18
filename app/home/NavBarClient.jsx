"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { RxHamburgerMenu } from "react-icons/rx";

import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { useClientContext } from "../context/ClientProvider";
import { UrlWeb } from "../libs/UrlWeb";


const getRestaurante = async () => {
  const sess = await getSession()

  const res = await fetch(`${UrlWeb}/restaurante?restaurante_id=${sess?.user?.id}`, {
    method: "GET",
    headers: {
      "Accept": "application/json"
    }

  })

  const data = await res.json()

  return data

}
const NavBarClient = () => {
  const { setSession } = useClientContext()
  const [cambiarclase, setCambiarclase] = useState(false);
  const { back ,refresh} = useRouter();
  const [restaurante, setRestaurante] = useState([])
  const { data: session, update } = useSession();
  const path = usePathname()

  const showMenu = () => {
    document.getElementById("menu").classList.toggle("show_menu");
    setCambiarclase(!cambiarclase);
  };

  useEffect(() => {

    setSession(session);

    const loadResta = async () => {

      if (session?.user?.id) {
        const restauran = await getRestaurante()

        setRestaurante(restauran)
      }

    }

    loadResta()

  }, [])



  const handlerRestaurante = async (e) => {
    const selectedId = e.target.value;

    await update({
      ...session,
      user: {
        ...session?.user,
        restaurante_id: selectedId
      }
    })
    refresh()


  }
  const isActive = (ruta) => {
    return path == ruta ? `text-purple-900` : `text-slate-900`
  }
  return (
    <div className="nav_container">
      <div className=" w-full h-full flex  justify-between p-4  items-center ">
        <div className="flex gap-4 justify-center items-center">
          <Image
            alt="logo al alma"
            src="/wallpaperlogin.svg"
            width={60}
            height={60}
            priority="true"
            className="border border-slate-300 rounded-full p-2 object-cover"
          />
          <span className="text-slate-900">Bienvenido {session?.user?.username}</span>
        </div>
        <div className="navbar_container">
          <ul className='menu' id="menu">
            <Link href="/home" onClick={showMenu} className={isActive('/home')}>
              Home
            </Link>
            <Link href="/home/mermas" onClick={showMenu} className={isActive("/home/mermas")}>
              Mermas
            </Link>
            <Link href="/home/pedidos" onClick={showMenu} className={isActive("/home/pedidos")}>
              Pedidos
            </Link>
            {session?.user.isAdmin ? (
              (<div className="flex gap-2 items-center justify-center">
                <Link href="/dashboard" onClick={showMenu}>
                  Dashboard
                </Link>
                <select name="" id="" onChange={handlerRestaurante}>
                  {
                    restaurante && restaurante?.map((e) => <option key={e._id} value={e._id}>{e?.nombre}</option>)
                  }

                </select>
              
              </div>)
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
