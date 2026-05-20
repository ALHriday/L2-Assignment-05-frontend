const url = new URL(process.env.NEXT_PUBLIC_API_URL!).toString();

export const orderService = {

    getOrderData: async () => {
        try {
            const res = await fetch(`${url}api/orders`, {
                credentials: "include",
                cache: 'no-store'
            });

            const data = await res.json();
            return { result: data?.data ?? [], error: null };
        } catch {
            return { result: null, err: { message: 'something went wrong!' } }
        }
    },
    getSellerOrders: async () => {
        try {
            const res = await fetch(`${url}api/seller/orders`, {
                credentials: "include",
                cache: 'no-store'
            });

            const data = await res.json();
            return { result: data?.data ?? [], error: null };
        } catch {
            return { result: null, err: { message: 'something went wrong!' } }
        }
    },
}