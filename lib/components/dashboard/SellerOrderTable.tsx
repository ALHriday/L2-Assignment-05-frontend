"use client"

import { useState } from "react";
import LoadingComponent from "../LoadingComponent";
import toast, { Toaster } from "react-hot-toast";
import useSellerOrder from "@/lib/hooks/useSellerOrder";

type SellerOrder = {
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

const url = new URL(process.env.NEXT_PUBLIC_API_URL!).toString();


const SellerOrderTable = () => {

    const [orderStatus, setOrderStatus] = useState<string | null>(null);
    const [orderId, setOrderId] = useState<string | null>(null);

    const { sellerOrders, isLoading, refetch } = useSellerOrder();

    const statusArr = ["PLACED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

    const handleData = (value: string, id: string) => {
        if (value) {
            setOrderStatus(value);
            setOrderId(id);
        } else {
            setOrderStatus(null);
            setOrderId(null);
        }
    }

    const handleUpdateStatus = async () => {
        if (!orderId && !orderStatus) {
            return toast.error(`Can't Update Order Status!`);
        }
        try {
            const res = await fetch(`${url}api/seller/orders/${orderId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: orderStatus }),
                credentials: 'include',
                cache: 'no-store'
            })

            const data = await res.json();

            if (data) {
                toast.success("Order Status Updated");
                refetch();
            } else {
                toast.error("Try Again!");
            }
        } catch (error) {
            console.error(error);
        }
        setOrderId(null);
        setOrderStatus(null);
    }

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
                            <th className="p-4 text-left">N0</th>
                            <th className="px-6 py-4 text-left">Name</th>
                            <th className="px-6 py-4 text-left">Phone</th>
                            <th className="px-6 py-4 text-left">Status</th>
                            <th className="px-6 py-4 text-left">COD</th>
                            <th className="px-6 py-4 text-left">Shipping Address</th>
                            <th className="px-6 py-4 text-right">Amount</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sellerOrders && sellerOrders?.map((order: SellerOrder, idx: number) => <tr key={order.id} className="border-b border-slate-100 hover:border-slate-50 shadow-sm transition">
                            <td className="p-4">{idx + 1 < 10 ? `0${idx + 1}.` : `${idx + 1}.`}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div>
                                        <h2 className="font-medium text-slate-800">{order?.name}</h2>
                                    </div>
                                </div>
                            </td>

                            <td className="px-6 py-4">{order?.phone || `N/A`}</td>

                            <td className="px-6 py-4 flex flex-col lg:flex-row justify-start items-center gap-2">
                                <span>{order?.status}</span>
                                <select className="ml-4 text-sm font-semibold rounded-md bg-cyan-400/15 border px-2 py-1 " onChange={(e) => handleData(e.target.value, order.id)}>
                                    <option value="">Select</option>
                                    {statusArr.map(item => <option key={item} value={item}>{item}</option>)}
                                </select>

                                {orderId === order.id &&
                                    <button onClick={() => handleUpdateStatus()} className="ml-2 px-2 py-1 rounded-md bg-cyan-600 text-sm text-white">Change</button>
                                }

                            </td>
                            <td className="px-6 py-4">{order?.cashOnDelivery ? "YES" : "NO"}</td>
                            <td className="px-6 py-4">{order?.shippingAddress}</td>
                            <td className="px-6 py-4 text-end">${order?.totalAmount}</td>
                        </tr>)}
                    </tbody>
                </table>
                {!sellerOrders?.length && <div className="text-2xl font-semibold text-center my-6">
                    No Orders Available!
                </div>}
            </div>
        </div>
    );
};

export default SellerOrderTable;