"use client"

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { authClient } from "../auth-client";

type GoogleText = {
    name: string;
}

const googleLogin = (text: GoogleText) => {
    const handleSignInWithGoogle = async () => {
        try {
            const { error, data } = await authClient.signIn.social({
                provider: "google",
                callbackURL: `${process.env.NEXT_PUBLIC_APP_URL!}`,
            });
            if (error || !data) {
                toast.error('Something went wrong! Please try again later');
            }
        } catch {
            toast.error("Sign In unsuccessful! Please try again later.");
        };
    }
    return (
        <Button onClick={() => handleSignInWithGoogle()} type="submit" className="w-full">
            {text.name}
        </Button>
    );
};

export default googleLogin;