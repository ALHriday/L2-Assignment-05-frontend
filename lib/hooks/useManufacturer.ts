"use client"

import { useQuery } from "@tanstack/react-query";
import { Manufacturer } from "../types/types";

const useManufacturer = () => {

    const { data: manufacturer, refetch, isLoading } = useQuery({
        queryKey: ['manufacturer'],
        queryFn: async () => {
            const res = await fetch(`/api/getAllManufacturer`);
            const data = await res.json();

            const manufacturer = data?.data?.map((item: Manufacturer) => item);
            return manufacturer ?? [];
        },
    });
    return { manufacturer, refetch, isLoading };
};

export default useManufacturer;