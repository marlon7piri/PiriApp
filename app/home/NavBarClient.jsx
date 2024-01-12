"use client";

import Link from "next/link";
import React from "react";
import { redirect, useRouter } from "next/navigation";
import { useSession,signIn,signOut } from "next-auth/react";

import { DeviconFaunadb } from "../icons/Logo";

const NavBarClient = () => {
  const { back } = useRouter();
  const {data:session} = useSession()
console.log(session?.user.email)
  if(!session) redirect('/login')

  return (
    <nav className="bg-slate-50 w-full flex justify-between  items-center p-4 fixed ">
   {/*    <DeviconFaunadb /> */}
   <span className="text-slate-900">Restaurante Al-Alma</span>

      <span className="text-slate-900">Bienvenido {session?.username}</span>
      <ul className=" flex gap-4">
      
        <button onClick={() => back()}>Regresar</button>
        <Link href="/home/pedidos">Pedidos</Link>
       {!session ?   <Link href="/login">Login</Link> :  <button onClick={signOut}>Logout</button>}
      { session?.user.email === 'marlon7piri@gmail.com' || session?.user.email === 'antoniojtnox@gmail.com'?<Link href="/dashboard">Dashboard</Link> :"" }
      </ul>
    </nav>
  );
};

export default NavBarClient;
