import { medicinesService } from "@/modules/medicines/medicines.service";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "./useDebounce";
import { SortField, SortOrder } from "../types/types";

interface Filter {
    search: string;
    m: string;
    sortField: SortField,
    sortOrder: SortOrder,
    categoryId: string;
    skip: number;
}

const useMedicinesData = ({ search, m, sortField, sortOrder, categoryId, skip }: Filter) => {
    const searchValue = useDebounce(search, 500);

    const { data, refetch, isLoading } = useQuery({
        queryKey: ['medicines', searchValue, m, sortField, sortOrder, categoryId, skip],
        queryFn: async () => {
            const data = await medicinesService.getMedicines(searchValue, m, sortField, sortOrder, categoryId, skip);
            return data?.data ?? [];
        },
        staleTime: 3000,
    });
    return { data, refetch, isLoading };
};

export default useMedicinesData;