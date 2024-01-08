"use client";

import Link from "next/link";
import React from "react";
import { redirect, useRouter } from "next/navigation";
import { useSession,signIn,signOut } from "next-auth/react";

import { DeviconFaunadb } from "../icons/Logo";

const NavBarClient = () => {
  const { back } = useRouter();
  const {data:session} = useSession()

/*   if(!session) redirect('/login') */

  return (
    <nav className="bg-slate-50 w-full flex justify-between  items-center p-4 fixed ">
      <DeviconFaunadb />

      <span>Bienvenido {session?.user?.name}</span>
      <ul className=" flex gap-4">
      <Link href="/login">Pedidos</Link>
       {/*  <button onClick={() => back()}>Regresar</button> */}
        <Link href="/home/pedidos">Pedidos</Link>
       {!session ?   <button onClick={signIn}>Login</button>:  <button onClick={signOut}>Logout</button>}
      { session?.user.email === 'marlon7piri@gmail.com'?<Link href="/dashboard">Dashboard</Link> :"" }
      </ul>
    </nav>
  );
};

export default NavBarClient;
