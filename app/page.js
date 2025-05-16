"use client";
import Link from "next/link";
import { useAuthContext } from "./context/AuthContext";
import signOutUser from "../firebase/auth/signout";  // Only one level up needed
import { useRouter } from "next/navigation";

export default function Home() {
    const { user } = useAuthContext();
    const router = useRouter();

    const handleSignOut = async () => {
        const { error } = await signOutUser();
        if (!error) {
            router.push("/");
        } else {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <div className="min-h-screen">
            <div className="max-w-4xl mx-auto py-10 px-4">
                <h1 className="text-3xl font-bold mb-8 text-[#8B2C3B] text-center">Bienvenido a Cartas Sin Marcar</h1>
                
                <div className="flex flex-col items-center gap-4 mt-12">
                    {user ? (
                        <>
                            <Link href="/cartas">
                                <button className="px-8 py-3 rounded-full bg-[#ffe6a0] text-[#8B2C3B] font-bold shadow-lg hover:bg-[#ffda6a] transition">
                                    Ver Cartas
                                </button>
                            </Link>
                            <button
                                onClick={handleSignOut}
                                className="px-8 py-3 rounded-full bg-gray-200 text-gray-700 font-bold shadow-lg hover:bg-gray-300 transition"
                            >
                                Cerrar sesión
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <Link href="/signin">
                                <button className="px-8 py-3 rounded-full bg-[#ffe6a0] text-[#8B2C3B] font-bold shadow-lg hover:bg-[#ffda6a] transition">
                                    Iniciar sesión
                                </button>
                            </Link>
                            <Link href="/signup">
                                <button className="px-8 py-3 rounded-full bg-[#8B2C3B] text-[#ffe6a0] font-bold shadow-lg hover:bg-[#6a1c27] transition">
                                    Registrarse
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
