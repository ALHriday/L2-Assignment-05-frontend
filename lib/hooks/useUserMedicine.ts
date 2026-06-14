"use client"

import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";


const useUserMedicine = () => {
    const pathName = usePathname();
    const { data: userMedicine, refetch, isLoading } = useQuery({
        queryKey: ['userMedicine'],
        queryFn: async () => {
            const res = await fetch(`/api/getMedicineByUser`, { credentials: "include", cache: "no-store" });
            const data = await res.json();
            return data?.data;
        },
        enabled: pathName.startsWith('/dashboard'),
    });
    return { userMedicine, refetch, isLoading };
};

export default useUserMedicine;