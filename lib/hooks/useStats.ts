import { useQuery } from "@tanstack/react-query";


const useStats = () => {
    const { data: stats, refetch, isLoading } = useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const res = await fetch(`/api/stats`, { credentials: "include", cache: "no-store" });
            const data = await res.json();
            return data?.data ?? [];
        },
    });
    return { stats, refetch, isLoading };
};

export default useStats;