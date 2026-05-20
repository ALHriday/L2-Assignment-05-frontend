import RoleAndNavigateList from "@/lib/components/dashboard/RoleAndNavigateList";
import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {

    const session = await getSession();
    const user = session?.user;
    if (!user) { return redirect('/login') };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            <aside className="lg:w-64 bg-slate-200 flex flex-col">
                <div className="lg:hidden bg-[rgb(0,128,150)] text-white px-8 py-4">
                    <h1 className="text-4xl font-bold">Hello, {user.name.toUpperCase()}👨‍💻</h1>
                    <h2 className="text-2xl">Welcome to dashboard</h2>
                </div>
                <div className="p-4">
                    <div className="flex gap-4 justify-start items-center text-slate-50 text-xl font-bold px-4 py-2 bg-cyan-700 border-2 border-cyan-500 rounded-md">
                        <div className="p-1 rounded-full border-4 border-cyan-300 bg-slate-100 text-center">🙍‍♂️</div>
                        <div className="">{user.role} </div>
                    </div>
                </div>
                <RoleAndNavigateList role={user.role} />
            </aside>
            <main className="lg:flex-1 bg-slate-50">
                <div className="hidden lg:block bg-[rgb(0,128,150)] text-white px-8 py-4">
                    <h1 className="text-4xl font-bold">Hello, {user.name.toUpperCase()}👨‍💻</h1>
                    <h2 className="text-2xl">Welcome to dashboard</h2>
                </div>
                <section className="max-w-7xl">
                    {children}
                </section>
            </main>
        </div>
    );
};

export default layout;