"use client";
import Link from "next/link";
import ProtectedRoute from "../components/ProtectedRoute";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import signOutUser from "../../firebase/auth/signout";
import { useRouter } from "next/navigation";

export default function Cartas() {
  const [cartas, setCartas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();

  useEffect(() => {
    fetch("/api/firestore")
      .then(res => res.json())
      .then(data => {
        setCartas(data);
        setLoading(false);
      });
  }, []);

  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await signOutUser();
    if (!error) {
      router.push("/");
    } else {
      alert("Error al cerrar sesión");
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto pt-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#8B2C3B]">Cartas disponibles</h1>
          <div className="flex gap-2">
            <Link href="/nueva-carta">
              <button className="px-6 py-2 rounded-full bg-[#ffe6a0] text-[#8B2C3B] font-bold shadow-sm hover:bg-[#ffda6a] transition">Enviar nueva carta</button>
            </Link>
            <button
              onClick={handleSignOut}
              className="px-6 py-2 rounded-full bg-gray-200 text-gray-700 font-bold shadow-sm hover:bg-gray-300 transition"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
        {loading ? (
          <p className="text-[#8B2C3B]">Cargando cartas...</p>
        ) : (
          <ul className="space-y-4">
            {cartas.map((carta) => (
              <li key={carta.id} className="bg-[#fff8e1] rounded-xl p-4 shadow flex flex-col gap-2">
                <span className="font-semibold text-[#8B2C3B]">{carta.nombre}</span>
                <span className="text-[#222]">{carta.mensaje}</span>
                <span className="text-xs text-[#bfa77a]">ID: {carta.id}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ProtectedRoute>
  );
}