"use client"

import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";


const useSellerOrder = () => {
    const pathName = usePathname();
    const { data: sellerOrders, refetch, isLoading } = useQuery({
        queryKey: ['sellerOrders'],
        queryFn: async () => {
            const res = await fetch(`/api/seller/orders`, { credentials: "include", cache: "no-store" });
            const data = await res.json();
            return data?.data;
        },
        enabled: pathName.startsWith('/dashboard/seller'),
    });
    return { sellerOrders, refetch, isLoading };
};

export default useSellerOrder;