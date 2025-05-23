"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NuevaCarta() {
  const [form, setForm] = useState({ nombre: "", mensaje: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/firestore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: form })
      });
      if (res.ok) {
        console.log("Carta enviada correctamente, actualizando UI y navegando a /cartas");
        setLoading(false); // Actualizar el estado de carga explícitamente
        setForm({ nombre: "", mensaje: "" }); // Limpiar el formulario
        router.push("/cartas");
        return; // Salir de la función después de iniciar la navegación
      } else {
        const data = await res.json();
        setError(data.error || "Ocurrió un error al enviar la carta.");
        setLoading(false); // Asegurar que setLoading(false) se llama en caso de error de respuesta
      }
    } catch (err) {
      setError("No se pudo conectar con el servidor.");
      setLoading(false); // Asegurar que setLoading(false) se llama en caso de error de red/fetch
    }
    // El setLoading(false) aquí abajo ya no es estrictamente necesario
    // porque todos los caminos anteriores lo manejan o resultan en una navegación.
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto bg-white p-8 rounded-xl shadow pt-12">
      <h1 className="text-2xl font-bold text-[#8B2C3B] mb-4 text-center">Nueva carta</h1>
      <input
        className="w-full border border-[#ffe6a0] rounded px-3 py-2 text-[#222] bg-[#fff8e1] placeholder:text-[#bfa77a]"
        value={form.nombre}
        onChange={e => setForm({ ...form, nombre: e.target.value })}
        placeholder="Nombre"
        required
      />
      <textarea
        className="w-full border border-[#ffe6a0] rounded px-3 py-2 text-[#222] bg-[#fff8e1] placeholder:text-[#bfa77a]"
        value={form.mensaje}
        onChange={e => setForm({ ...form, mensaje: e.target.value })}
        placeholder="Mensaje"
        required
      />
      <button
        type="submit"
        className="w-full py-2 rounded-full bg-[#ffe6a0] text-[#8B2C3B] font-bold shadow-sm transition hover:bg-[#ffda6a]"
        disabled={loading}
      >
        {loading ? "Enviando..." : "Enviar carta"}
      </button>
      {error && <p className="text-red-600 text-center mt-2">{error}</p>}
    </form>
  );
}