export { default } from "next-auth/middleware"
export const config = {
     matcher: ["/home/:path*","/dashboard/:path*","/"]
     }

/*      export { default } from "next-auth/middleware"
export const config = {
     matcher: ["/prueba"]
     } */