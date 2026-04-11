
const url = new URL(process.env.NEXT_PUBLIC_API_URL!).toString();

export const userService = {
    updateUserProfile: async (data: FormData) => {
        try {
            const res = await fetch(`${url}api/users/profile`, {
                method: "PUT",
                credentials: "include",
                body: data
            });

            const result = await res.json();

            return { result: result, error: null };
        } catch {
            return { result: null, err: { message: 'something went wrong!' } }
        }
    }
}