"use client"

import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";



const useOrdersData = () => {
    const pathName = usePathname();
    const { data: orders, refetch, isLoading } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await fetch(`/api/orders`, { credentials: "include", cache: "no-store" });
            const data = await res.json();

            return data?.data;
        },
        enabled: pathName.startsWith('/dashboard'),
    });
    return { orders, refetch, isLoading };
};

export default useOrdersData;