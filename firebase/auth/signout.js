import { getAuth, signOut } from "firebase/auth";
import app from "../firebase";

export default async function signOutUser() {
    const auth = getAuth(app);
    try {
        await signOut(auth);
        return { result: true, error: null };
    } catch (error) {
        return { result: null, error: error.message };
    }
}