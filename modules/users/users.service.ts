


export const userService = {
    updateUserProfile: async (data: FormData) => {
        try {
            const res = await fetch(`/api/users/profile`, {
                method: "PUT",
                credentials: "include",
                body: data
            });
            if (!res.ok) {
                throw new Error('Internal Server Error!');
            }
            const result = await res.json();

            return { result: result, error: null };
        } catch {
            return { result: null, err: { message: 'something went wrong!' } }
        }
    },
    registerUser: async (data: FormData) => {
        try {
            const res = await fetch(`/api/auth/signup`, {
                method: "POST",
                body: data
            });
            if (!res.ok) {
                throw new Error('Internal Server Error!');
            }
            const result = await res.json();

            return { result: result, error: null };
        } catch {
            return { result: null, err: { message: 'something went wrong!' } }
        }
    },
}