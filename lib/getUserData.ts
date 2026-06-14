import { cookies } from "next/headers";



const getUserData = async () => {
    const cookieStore = await cookies();
    try {
        const res = await fetch(`/api/admin/users`, {
            method: "GET",
            headers: { Cookie: cookieStore.toString() },
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error('Internal Server Error!');
        }
        const result = await res.json();

        return { result: result.data, error: null };
    } catch {
        return { result: null, err: { message: 'something went wrong!' } }
    }
};

export default getUserData;