import { createAuthClient } from "better-auth/react";
import { Role } from "./types/types";

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_APP_URL
        ? process.env.NEXT_PUBLIC_APP_URL
        : "/api/auth",
    fetchOptions: { credentials: "include" },

    plugins: [
        {
            id: "next-cookies-request",
            fetchPlugins: [
                {
                    id: "next-cookies-request-plugin",
                    name: "next-cookies-request-plugin",
                    hooks: {
                        async onRequest(ctx) {
                            if (typeof window === "undefined") {
                                const { cookies } = await import("next/headers");
                                const headers = await cookies();
                                ctx.headers.set("cookie", headers.toString());
                            }
                        },
                    },
                },
            ],
        },
    ],
});


export type Session = typeof authClient.$Infer.Session;
export type User = Session["user"] & {
    phone?: string;
    role?: Role;
};