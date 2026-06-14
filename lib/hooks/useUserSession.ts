"use client"

import { useQuery } from "@tanstack/react-query";
import { authClient, User } from "../auth-client";

const useUserSession = () => {

    const { data: userSession, isError, isLoading, error, refetch } = useQuery<User | null>({
        queryKey: ['session'],
        queryFn: async () => {
            const { data } = await authClient.getSession();
            return data?.user ?? null;
        },
        staleTime: Infinity,
        retry: 1,
        refetchOnWindowFocus: false,
    });
    return { userSession, isError, isLoading, error, refetch };
};

export default useUserSession;