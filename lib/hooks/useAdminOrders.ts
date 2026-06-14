"use client"

import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";


const useAdminOrders = () => {
    const pathName = usePathname();
    const { data: adminOrders, refetch, isLoading } = useQuery({
        queryKey: ['adminOrders'],
        queryFn: async () => {
            const res = await fetch(`/api/admin/orders`, { credentials: "include", cache: "no-store" });
            const data = await res.json();
            return data?.data;
        },
        enabled: pathName.startsWith('/dashboard/admin'),
    });
    return { adminOrders, refetch, isLoading };
};

export default useAdminOrders;