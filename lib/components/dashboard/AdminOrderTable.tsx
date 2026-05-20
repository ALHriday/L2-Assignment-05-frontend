"use client"

import LoadingComponent from "../LoadingComponent";
import { Toaster } from "react-hot-toast";
import useAdminOrders from "@/lib/hooks/useAdminOrders";
import Link from "next/link";

type Order = {
    id: string;
    name: string;
    phone: string;
    shippingAddress: string;
    status: string;
    cashOnDelivery: boolean;
    totalAmount: number;
    createdAt: Date;
    updateAt: Date;
}


const AdminOrderTable = () => {
    const { adminOrders, isLoading } = useAdminOrders();


    if (isLoading) {
        return <LoadingComponent text="Loading Orders..." />
    }

    return (
        <div className="bg-white p-4 rounded-md shadow-sm border border-slate-200 overflow-hidden">
            <Toaster position="top-center" />
            <h1 className="text-3xl font-bold p-4 bg-[#008096] text-white shadow-md rounded-t-md ">All Orders</h1>
            <div className="overflow-x-auto">
                <table className="w-full min-w-175">
                    <thead className="bg-[#008096] text-white rounded-md shadow-md border-2 border-teal-400">
                        <tr>
                            <th className="px-4 text-left">No.</th>
                            <th className="px-6 py-4 text-left">Name</th>
                            <th className="px-6 py-4 text-left">Phone</th>
                            <th className="px-6 py-4 text-left">Status</th>
                            <th className="px-6 py-4 text-left">COD</th>
                            <th className="px-6 py-4 text-left">Shipping Address</th>
                            <th className="px-6 py-4 text-right">Amount</th>
                            <th className="px-6 py-4 text-right">Print</th>
                        </tr>
                    </thead>

                    <tbody>
                        {adminOrders && adminOrders?.map((order: Order, idx: number) => <tr key={order.id} className="border-b border-slate-100 hover:border-slate-50 shadow-sm transition">
                            <td className="p-4">{idx + 1 < 10 ? `0${idx + 1}.` : `${idx + 1}.`}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div>
                                        <h2 className="font-medium text-slate-800">{order?.name}</h2>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">{order?.phone || `N/A`}</td>

                            <td className="px-6 py-4">
                                {order?.status}
                            </td>
                            <td className="px-6 py-4">{order?.cashOnDelivery ? "YES" : "NO"}</td>
                            <td className="px-6 py-4">{order?.shippingAddress}</td>
                            <td className="px-6 py-4 text-end">${order?.totalAmount}</td>
                            <td className="px-6 py-4 text-end">
                                <Link href={`/checkout/${order.id}`}>
                                    <button className="p-2 bg-cyan-400/10 shadow-md text-xl rounded-md border border-cyan-400">🖨️</button>
                                </Link>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
                {!adminOrders?.length && <div className="text-2xl font-semibold text-center my-6">
                    No Orders Available!
                </div>}
            </div>
        </div>
    );
};

export default AdminOrderTable;