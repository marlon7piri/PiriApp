"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export const FollowSession = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [showAlert, setShowAlert] = useState(false);
  const protectedRoutes = ["/home", "/dashboard"];
  const publicRoutes = ["/login", "/register"]; // Rutas públicas

  useEffect(() => {
    if (publicRoutes.some((route) => pathname.startsWith(route))) return;

    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
      console.log({ status });
      if (status === "unauthenticated") {
        setShowAlert(true);
      }
    }
  }, [status, pathname]);

  const handleLogout = () => {
    setShowAlert(false);
    signOut({ redirect: false });
    router.push("/login"); // Redirige al login
  };

  if (!showAlert) return null;

  return (
    <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-lg font-bold">Sesión expirada</h1>
        <p>Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.</p>
        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};
