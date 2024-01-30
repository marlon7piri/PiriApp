import Image from 'next/image'
import Home from './home/page'
import Areas from './home/Areas'
import Login from './login/page'

export default function page() {
  return (
    <main className='w-full h-screen overflow-scroll flex flex-col justify-center items-center p-4'>
     {/*  <div>
      <h1 className='  w-full  text-4xl text-center font-bold'>Inventario</h1>
      </div>
     <Areas/> */}
     <Login/>
    </main>
  )
}
