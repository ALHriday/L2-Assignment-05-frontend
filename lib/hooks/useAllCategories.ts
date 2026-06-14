"use client"

import { useQuery } from "@tanstack/react-query";
import { Category } from "../types/types";


const useAllCategories = () => {
    const { data: allCategory, refetch, isLoading } = useQuery({
        queryKey: ['allCategory'],
        queryFn: async () => {
            const res = await fetch(`/api/getAllCategory`);
            const data = await res.json();

            const categories = data?.data?.map((item: Category) => item);
            return categories ?? { data: [] };
        },
    });
    return { allCategory, refetch, isLoading };
};

export default useAllCategories;
