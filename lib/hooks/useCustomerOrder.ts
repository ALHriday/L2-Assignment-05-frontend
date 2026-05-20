"use client"

import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
const url = new URL(process.env.NEXT_PUBLIC_API_URL!).toString();

const useCustomerOrder = () => {
    const pathName = usePathname();
    const { data: customerOrders, refetch, isLoading } = useQuery({
        queryKey: ['customerOrders'],
        queryFn: async () => {
            const res = await fetch(`${url}api/user/orders`, { credentials: "include", cache: "no-store" });
            const data = await res.json();

            return data?.data;
        },
        enabled: pathName.startsWith('/dashboard/customer'),
    });
    return { customerOrders, refetch, isLoading };
};

export default useCustomerOrder;