"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Cartas() {
  const [cartas, setCartas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/firestore")
      .then(res => res.json())
      .then(setCartas)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Estructura igual */}
    </div>
  );
}