"use client"

import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";


const useCustomerOrder = () => {
    const pathName = usePathname();
    const { data: customerOrders, refetch, isLoading } = useQuery({
        queryKey: ['customerOrders'],
        queryFn: async () => {
            const res = await fetch(`/api/user/orders`, { credentials: "include", cache: "no-store" });
            const data = await res.json();

            return data?.data;
        },
        enabled: pathName.startsWith('/dashboard'),
    });
    return { customerOrders, refetch, isLoading };
};

export default useCustomerOrder;