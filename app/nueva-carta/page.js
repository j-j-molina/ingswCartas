"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NuevaCarta() {
  const [form, setForm] = useState({ nombre: "", mensaje: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/firestore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: form })
      });
      if (res.ok) router.push("/cartas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto bg-white p-8 rounded-xl shadow">
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
    </form>
  );
}