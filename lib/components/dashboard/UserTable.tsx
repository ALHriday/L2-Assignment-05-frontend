"use client"

import useUsers from "@/lib/hooks/useUsers";
import { User } from "@/lib/types/types";
import Image from "next/image";
import { MdDeleteForever } from "react-icons/md";
import ModalComponent from "../modal/ModalComponent";
import { useState } from "react";
import LoadingComponent from "../LoadingComponent";
import toast, { Toaster } from "react-hot-toast";



const UserTable = () => {

    const [isOpen, setIsOpen] = useState(false);
    const { users, isLoading } = useUsers();
    const [userStatus, setUserStatus] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    const { refetch } = useUsers();

    const handleData = (value: string, id: string) => {
        if (!value) {
            setUserStatus(null);
            setUserId(null);
        } else {
            setUserStatus(value);
            setUserId(id);
        }
    }

    const handleUpdateStatus = async () => {
        if (!userId && !userStatus) {
            return toast.error(`Can't Update User Status!`);
        }

        try {
            const res = await fetch(`/api/admin/users/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: userStatus }),
                credentials: 'include',
                cache: 'no-store'
            })

            const data = await res.json();

            if (data) {
                toast.success("User Status Updated");
                refetch();
            } else {
                toast.error("Sorry, Try Again!");
            }
        } catch (error) {
            console.error(error);
        }
        setUserId(null);
        setUserStatus(null);
    }

    const handleDelete = () => {
        setIsOpen(false);
    }

    if (isLoading) {
        return <LoadingComponent text="Loading users..." />
    }

    return (
        <div className="bg-white p-4 rounded-md shadow-sm border border-slate-200 overflow-hidden">
            <Toaster position="top-center" />
            <div className="overflow-x-auto">
                <table className="w-full min-w-175">
                    <thead className="bg-cyan-800 text-white rounded-md shadow-md border-2 border-teal-400">
                        <tr>
                            <th className="p-4 text-left">No.</th>
                            <th className="px-6 py-4 text-left">User</th>
                            <th className="px-6 py-4 text-left">Phone</th>
                            <th className="px-6 py-4 text-left">Role</th>
                            <th className="px-6 py-4 text-left">Status</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users?.map((user: User, idx: number) => <tr key={user.id} className="border-b border-slate-100 hover:border-slate-50 shadow-sm transition">
                            <td className="p-4">{idx + 1 < 10 ? `0${idx + 1}.` : `${idx + 1}.`}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <Image className="rounded-full object-cover w-10 h-10"
                                        src={user?.image || 'https://img.icons8.com/?size=100&id=z-JBA_KtSkxG&format=png&color=000000'}
                                        alt={user?.name || 'Guest'}
                                        width={40}
                                        height={40}
                                        title={user?.name || 'Guest'}
                                        priority
                                    />

                                    <div>
                                        <h2 className="font-medium text-slate-800">{user.name}</h2>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">{user?.phone || `N/A`}</td>
                            <td className="px-6 py-4">{user?.role}</td>
                            <td className="px-6 py-4 flex flex-col lg:flex-row justify-start items-center gap-2">
                                <span>{user?.status}</span>
                                <select className="ml-4 text-sm font-semibold rounded-md bg-cyan-400/15 border px-2 py-1 " onChange={(e) => handleData(e.target.value, user.id)}>
                                    <option value="">Select</option>
                                    <option value="ACTIVE">ACTIVE</option>
                                    <option value="BAN">BAN</option>
                                </select>
                                {userId === user.id &&
                                    <button onClick={() => handleUpdateStatus()} className="ml-2 px-2 py-1 rounded-md bg-cyan-600 text-sm text-white">Change</button>
                                }

                            </td>
                            <td className="px-6 py-4 text-right">
                                {user.role === 'ADMIN' ? <></> :
                                    <button onClick={() => setIsOpen(true)} className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"><MdDeleteForever size={20} /></button>
                                }
                                <ModalComponent
                                    modalTitle="Delete User!"
                                    modalIcon="/delete-icon.png"
                                    modalDescription="Are you sure want to delete!"
                                    isOpen={isOpen}
                                    onClose={() => setIsOpen(false)}
                                    onConfirm={handleDelete}
                                />
                            </td>
                        </tr>)}
                    </tbody>
                </table>
                {!users?.length && <div className="text-2xl font-semibold text-center my-6">
                    No Users Available!
                </div>}
            </div>
        </div>
    );
};

export default UserTable;