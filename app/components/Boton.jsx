import Link from 'next/link'
import React from 'react'
import styles from '@/app/dashboard/productos/styles.module.css'

const Boton = ({texto,href}) => {
  return (
    <Link className={styles.btnPrimary} href={href || ''}>{texto}</Link>
  )
}

export default Boton