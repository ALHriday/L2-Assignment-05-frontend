"use client"

import { authClient } from "@/app/(Auth)/auth-client";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

type GoogleText = {
    name: string;
}

const googleLogin = (text: GoogleText) => {
    const handleSignInWithGoogle = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: `${process.env.NEXT_PUBLIC_APP_URL!}`,
            })
            toast.success("SignIn successful.");
        } catch (err) {
            toast.error("SignIn unsuccessful. Try again later!");
            return err;
        }

    }
    return (
        <Button onClick={() => handleSignInWithGoogle()} type="submit" className="w-full">
            {text.name}
        </Button>
    );
};

export default googleLogin;