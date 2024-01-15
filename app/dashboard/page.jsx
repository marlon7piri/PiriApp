'use client'
import React from 'react'
import { useSession,signIn,signOut } from "next-auth/react";
import { redirect } from 'next/navigation';


const page = () => {
  const {data:session} = useSession()



  if(!session?.isAdmin){
    redirect('/home')
  }
  
  return (
    <div className='w-full h-screen'>

        <h1>Dashboard</h1>

    </div>
  )
}

export default page