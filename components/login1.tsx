"use client"

import { authClient } from "@/app/(Auth)/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GoogleLogin from "@/lib/components/googleLogin";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Login1Props {
  heading?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title?: string;
    className?: string;
  };
  buttonText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
  className?: string;
}

const Login1 = ({
  heading = "Login",
  logo = {
    url: "/login",
    src: "/mediStore.png",
    alt: "logo",
    title: "MediStore",
  },
  buttonText = "Login",
  signupText = "Need an account?",
  signupUrl = "/register",
  googleText = "Sign in with Google",
  className,
}: Login1Props) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();

  const handleSignInWithEmailAndPass = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await authClient.signIn.email({
        email,
        password
      });

      if (!data?.user) {
        return toast.error('Wrong Email or Password!');
      }
      toast.success('Login Successful.');
      router.push('/');
      router.refresh();
    } catch (err) {
      return err;
    }
  }

  return (
    <section className={cn("h-screen bg-muted", className)}>
      <div className="flex h-full items-center justify-center">
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
        {/* Logo */}
        <div className="flex flex-col gap-4 items-center lg:justify-start">
          {/* <Link href={logo.url}>
            <Image
              width={200}
              height={80}
              src={logo.src}
              alt={logo.alt}
              title={logo.title}
              className="dark:invert"
            />
          </Link> */}
          <div className="flex w-full max-w-sm min-w-sm flex-col items-center gap-y-4 rounded-md border border-muted bg-background px-6 py-8 shadow-md">
            {heading && <h1 className="text-xl font-semibold">{heading}</h1>}
            <form className="w-full flex flex-col gap-8" onSubmit={(e) => handleSignInWithEmailAndPass(e)}>
              <Input
                type="email"
                placeholder="Email"
                className="text-sm"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                className="text-sm"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" className="w-full">
                {buttonText}
              </Button>
            </form>
            <GoogleLogin name={googleText}></GoogleLogin>

          </div>
          <div className="flex justify-center gap-1 text-sm text-muted-foreground">
            <p>{signupText}</p>
            <Link
              href={signupUrl}
              className="font-medium text-primary hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </section >
  );
};

export { Login1 };
