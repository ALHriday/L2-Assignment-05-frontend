"use client"

// import { authClient } from "@/app/(Auth)/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../auth-client";

const LogoutUser = () => {
    const router = useRouter();
    const handleSignOut = async () => {
        try {
            await authClient.signOut();
            router.push('/login');
            router.refresh();
            toast.success('SignOut successful.');
        } catch (err) {
            toast.error(`Sign Out failed: ${err}`);
        }
    }
    return (
        <Button className='bg-red-500' onClick={() => handleSignOut()}>LogOut</Button>
    );
};

export default LogoutUser;
