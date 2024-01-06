import Link from 'next/link'
import React from 'react'

const Boton = ({styles = "bg-sky-500 px-4 py-2 rounded-md text-slate-900 hover:bg-sky-900 transition duration-500 hover:text-slate-50",texto,href}) => {
  return (
    <Link className={styles} href={href}>{texto}</Link>
  )
}

export default Boton