"use client"

import { useRouter } from "next/navigation";
import useStats from "../hooks/useStats";
import useUserSession from "../hooks/useUserSession";
import { Role } from "../types/types";
import LoadingComponent from "./LoadingComponent";
import Statistics from "./Statistics";
import { useEffect } from "react";

const StatsCard = () => {
    const { stats } = useStats();
    const { userSession, isLoading } = useUserSession();
    const router = useRouter();

    useEffect(() => {
        if (userSession?.role === Role.CUSTOMER) {
            router.replace('/dashboard/customer/orders');
        }
    }, [router, userSession?.role])

    if (isLoading) {
        return <LoadingComponent text="Loading Dashboard..." />
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row gap-4 p-4">
                <div className="flex md:justify-center items-center text-2xl semibold p-2 bg-slate-100 border-2 border-cyan-500 shadow-md rounded-md">
                    <h1 className="text-4xl border-r-2 p-2">💵</h1>
                    <div className="p-2 flex flex-col gap-1">
                        <h1>Total Revenue</h1>
                        <p>${stats?.totalRevenue < 10 ? `0${stats?.totalRevenue}` : stats?.totalRevenue}</p>
                    </div>
                </div>
                <div className="flex md:justify-center items-center text-2xl semibold p-2 bg-slate-100 border-2 border-cyan-500 shadow-md rounded-md">
                    <h1 className="text-4xl border-r-2 p-2">🛒</h1>
                    <div className="p-2 flex flex-col gap-1">
                        <h1>Orders</h1>
                        <p>{stats?.totalOrders < 10 ? `0${stats?.totalOrders}` : stats?.totalOrders}</p>
                    </div>
                </div>
                {userSession?.role === Role.ADMIN &&
                    <div className="flex md:justify-center items-center text-2xl semibold p-2 bg-slate-100 border-2 border-cyan-500 shadow-md rounded-md">
                        <h1 className="text-4xl border-r-2 p-2">🙍‍♂️</h1>
                        <div className="p-2 flex flex-col gap-1">
                            <h1>Users</h1>
                            <p>{stats?.totalUsers < 10 ? `0${stats?.totalUsers}` : stats?.totalUsers}</p>
                        </div>
                    </div>
                }
                <div className="flex md:justify-center items-center text-2xl semibold p-2 bg-slate-100 border-2 border-cyan-500 shadow-md rounded-md">
                    <h1 className="text-4xl border-r-2 p-2">💊</h1>
                    <div className="p-2 flex flex-col gap-1">
                        <h1>Products</h1>
                        <p>{stats?.totalMedicines < 10 ? `0${stats?.totalMedicines}` : stats?.totalMedicines}</p>
                    </div>
                </div>
            </div>
            <div>
                {stats && <Statistics />}
            </div>
        </div>
    );
};

export default StatsCard;