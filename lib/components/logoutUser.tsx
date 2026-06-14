"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../auth-client";
import { useQueryClient } from "@tanstack/react-query";

const LogoutUser = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const handleSignOut = async () => {
        try {
            await authClient.signOut();
            queryClient.invalidateQueries({
                queryKey: ['session'],
            });
            toast.success('Log Out successful.');
            router.push('/login');
        } catch (err) {
            toast.error(`Log Out failed: ${err}`);
        }
    }
    return (
        <Button className='bg-red-500' onClick={() => handleSignOut()}>LogOut</Button>
    );
};

export default LogoutUser;
