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
        body: JSON.stringify({ data: form })
      });
      if (res.ok) router.push("/cartas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos del formulario iguales */}
    </form>
  );
}