"use client";
import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
    const { user, loading: authContextLoading } = useAuthContext(); // Obtener el estado 'loading' del contexto
    const router = useRouter();

    useEffect(() => {
        // Solo redirigir si el contexto de autenticación NO está cargando Y no hay usuario
        if (!authContextLoading && !user) {
            router.push("/signin");
        }
    }, [user, authContextLoading, router]); // Incluir authContextLoading en las dependencias

    // Si el contexto de autenticación aún está cargando, no renderizar los hijos todavía.
    // AuthContextProvider ya muestra un indicador de carga global.
    if (authContextLoading) {
        return null; // O un indicador de carga específico para esta sección protegida
    }

    // Si la carga del contexto ha finalizado y hay un usuario, renderizar los hijos.
    // Si la carga ha finalizado y no hay usuario, el useEffect ya habrá gestionado la redirección.
    return <>{user ? children : null}</>;
}