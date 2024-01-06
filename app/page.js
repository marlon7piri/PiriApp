import Image from 'next/image'
import Home from './home/page'
import Areas from './home/Areas'

export default function page() {
  return (
    <main className='w-full h-screen overflow-scroll'>
      <h1>Inventario</h1>
     <Areas/>
    </main>
  )
}
