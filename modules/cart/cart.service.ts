

export const cartService = {

    getCartData: async () => {
        try {
            const res = await fetch(`/api/orders`, {
                credentials: "include",
                cache: 'no-store'
            });

            const data = await res.json();
            return { result: data?.data, error: null };
        } catch {
            return { result: null, err: { message: 'something went wrong!' } }
        }
    },
}