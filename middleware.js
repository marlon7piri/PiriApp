import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export { default } from "next-auth/middleware"


export async function middleware(request) {
     const path = request.headers
     const token = await getToken({ req: request })

     if (!token) {
          return NextResponse.redirect(new URL('/login', request.url))
     } 

     const curentDate = Math.floor(Date.now() / 1000) //Convertir a milisegundos la fecha actual

    
    if (token.exp && token.exp < curentDate) {
          return NextResponse.redirect(new URL('/login', request.url))
     }

     

     return NextResponse.next()
}

export const config = {
     matcher: ["/home/:path*", "/dashboard/:path*"]
}

