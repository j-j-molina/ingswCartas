import { db } from "../../../firebase";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("[POST] /api/firestore llamada recibida");
  let data;
  try {
    data = (await req.json()).data;
    console.log("[POST] Datos recibidos:", data);
    const docRef = doc(collection(db, "cartas"));
    await setDoc(docRef, { ...data, id: docRef.id });
    console.log("[POST] Documento creado con ID:", docRef.id);
    return NextResponse.json({ id: docRef.id });
  } catch (error) {
    console.error("[POST] Error:", error);
    return NextResponse.json({ error: error.message || String(error) }, { status: 500 });
  }
}

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "cartas"));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}