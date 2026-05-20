"use client"

import { Medicine } from "@/lib/types/types";
import Image from "next/image";
import { MdDeleteForever } from "react-icons/md";
import ModalComponent from "../modal/ModalComponent";
import { useState } from "react";
import LoadingComponent from "../LoadingComponent";
import useUserMedicine from "@/lib/hooks/useUserMedicine";
import toast, { Toaster } from "react-hot-toast";

const url = new URL(process.env.NEXT_PUBLIC_API_URL!).toString();


const MedicineTable = () => {
    const { userMedicine, isLoading, refetch } = useUserMedicine();
    const [isOpen, setIsOpen] = useState(false);
    const [updateStock, setIUpdateStock] = useState<number>(0);
    const [updateId, setUpdateId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const handleUpdate = async (id: string) => {

        try {
            const res = await fetch(`${url}api/seller/medicines/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ stock: updateStock }),
                credentials: 'include',
                cache: 'no-store'
            })

            const data = await res.json();

            if (data) {
                toast.success("Stock Updated");
                refetch();
            } else {
                toast.error("Try Again!");
            }
        } catch (error) {
            console.error(error);
        }
        setUpdateId(null);
    }

    const handleData = (id: string) => {
        setDeleteId(id);
        setIsOpen(true);
    }


    const handleDelete = async (id: string) => {
        if (deleteId !== id) {
            return toast.error(`Can't delete medicine!`);
        }
        try {
            const res = await fetch(`${url}api/seller/medicines/${id}`, {
                method: "DELETE",
                credentials: 'include',
                cache: 'no-store'
            })

            const data = await res.json();

            if (data) {
                toast.success("Medicine deleted successful");
                refetch();
            } else {
                toast.error("Try Again later!");
            }
        } catch (error) {
            console.error(error);
        }

        setIsOpen(false);
    }

    if (isLoading) {
        return <LoadingComponent text="Loading Medicines..." />
    }

    return (
        <div className="bg-white p-4 rounded-md shadow-sm border border-slate-200 overflow-hidden">
            <Toaster position="top-center" />
            <h1 className="text-3xl font-bold p-4 bg-[#008096] text-white shadow-md rounded-t-md ">All Medicines</h1>
            <div className="overflow-x-auto">
                <table className="w-full min-w-175">
                    <thead className="bg-[#008096] text-white rounded-md shadow-md border-2 border-teal-400">
                        <tr>
                            <th className="px-6 py-4 text-left">Title & Image</th>
                            <th className="px-6 py-4 text-left">Manufacturer</th>
                            <th className="px-6 py-4 text-left">Price</th>
                            <th className="px-6 py-4 text-left">Stock</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {userMedicine && userMedicine?.map((item: Medicine) => <tr key={item.id} className="border-b border-slate-100 hover:border-slate-50 shadow-sm transition">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <Image className="rounded-full object-cover w-10 h-10"
                                        src={item?.image || 'https://img.icons8.com/?size=100&id=z-JBA_KtSkxG&format=png&color=000000'}
                                        alt={item?.title || 'Guest'}
                                        width={40}
                                        height={40}
                                        title={item?.title || 'Guest'}
                                        priority
                                    />

                                    <div>
                                        <h2 className="font-medium text-slate-800">{item.title}</h2>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">{item?.manufacturer || `N/A`}</td>
                            <td className="px-6 py-4">${item?.price}</td>
                            <td className="px-6 py-4 text-start relative">
                                <span>{item?.stock}</span>
                                <button onClick={() => setUpdateId(item.id)} className="w-10 h-10 text-center ml-4 p-2 rounded-lg bg-black/20 hover:bg-black/40 transition">➕</button>
                                {updateId === item.id &&
                                    <div className="flex flex-col justify-center items-center z-50 gap-4 shadow-md fixed inset-0 bg-black/30 p-4">
                                        <div className="flex flex-col gap-6 justify-center items-center bg-white p-6 rounded-lg w-[90%] max-w-sm">
                                            <div className="text-2xl font-semibold text-cyan-700">
                                                Update Stock
                                            </div>
                                            <input className="px-4 py-3 border border-cyan-600 rounded-md" onChange={(e) => setIUpdateStock(e.target.valueAsNumber)} type="number"
                                                placeholder="Enter stock number"
                                            />
                                            <div className="flex gap-4 justify-center items-center">
                                                <button onClick={() => setUpdateId(null)} className="p-2 border bg-slate-100 border-cyan-600 shadow-sm rounded-md">Cancel</button>
                                                <button onClick={() => handleUpdate(item.id)} className="p-2 border bg-cyan-700 text-white shadow-sm rounded-md">Update</button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button onClick={() => handleData(item.id)} className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"><MdDeleteForever size={20} /></button>
                                {deleteId === item.id &&
                                    <ModalComponent
                                        modalTitle="Delete Medicine!"
                                        modalIcon="/delete-icon.png"
                                        modalDescription="Are you sure want to delete!"
                                        isOpen={isOpen}
                                        onClose={() => setIsOpen(false)}
                                        onConfirm={() => handleDelete(item.id)}
                                    />
                                }
                            </td>
                        </tr>)}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default MedicineTable;