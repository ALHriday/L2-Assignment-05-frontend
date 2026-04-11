import { cookies } from "next/headers";

export const getSession = async () => {
    const cookieStore = (await cookies()).toString();
    const res = await fetch('http://localhost:5000/api/auth/get-session', { headers: { Cookie: cookieStore }, cache: "no-store" });

    return await res.json() || {};
}