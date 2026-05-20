import { useQuery } from "@tanstack/react-query";
const url = new URL(process.env.NEXT_PUBLIC_API_URL!).toString();

const useStats = () => {
    const { data: stats, refetch, isLoading } = useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const res = await fetch(`${url}api/stats`, { credentials: "include", cache: "no-store" });
            const data = await res.json();
            return data?.data ?? [];
        },
    });
    return { stats, refetch, isLoading };
};

export default useStats;