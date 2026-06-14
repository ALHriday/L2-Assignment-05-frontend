import { cookies } from "next/headers";

export const getSession = async () => {
    try {
        const cookieStore = await cookies();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/api/auth/get-session`, { method: "GET", headers: { Cookie: cookieStore.toString() }, cache: "no-store" });

        if (!res.ok) {
            return null;
        }
        return await res.json();
    } catch {
        return null;
    }
};
