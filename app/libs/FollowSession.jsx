'use client'
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export const FollowSession = ({ children }) => {
    const { data: session } = useSession();
    const router = useRouter();
    const pathname = usePathname()
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const checkSession = () => {
            if (!session && !pathname.includes('/login') ) {
             
                setShowAlert(true);
            }
        };

        // Verifica la sesión cada 30 minutos (1800000 ms)
        const interval = setInterval(checkSession, 1800000);

        return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
    }, [session]);

    const handleLogout = () => {
        setShowAlert(false);
        router.push("/login"); // Redirige al login
    };

    return (
        <div>
            {children}

            {showAlert && (
                <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50">
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
            )}
        </div>
    );
};
