"use client"

import { Item, Order } from "../types/types";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdArrowForwardIos } from "react-icons/md";

const PrintComponent = ({ order }: { order: Order }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });

    return (
        <div>
            <div className="flex gap-2 p-4 bg-slate-100 font-semibold text-center justify-start items-center">
                <Link href={`/`}>{`Home`}</Link>
                <MdArrowForwardIos />
                <Link href={`/medicines`}>{`Medicines`}</Link>
            </div>
            <div ref={contentRef} className="p-4 md:p-8">
                <div className="p-4 md:w-10/12 mx-auto border-2 my-6 rounded-md">
                    <div>
                        <h1 className="text-center text-2xl font-semibold mt-2">Invoice</h1>
                    </div>
                    <div className="flex flex-col gap-4 justify-center">
                        <div className="flex flex-col justify-between gap-4 relative">
                            <h1 className="font-semibold text-xl">MediStore</h1>
                            <Image
                                className="absolute top-0 right-4"
                                src={`https://img.icons8.com/dusk/64/pills.png`}
                                alt="mediStore-logo"
                                width={60}
                                height={60}
                            />
                        </div>
                        <div className="flex flex-col gap-1 text-sm">
                            <h1>Invoice_Id:{order?.id && ` INV-${order?.id.slice(-5).toUpperCase()}`}</h1>
                            <h1>Name: {order?.name.toUpperCase() || ''}</h1>
                            <h1>Phone: {order?.phone}</h1>
                            <h1>Status: {order?.cashOnDelivery ? "UNPAID" : "PAID"}</h1>
                            <h1>Payment Method: {order?.cashOnDelivery ? "COD" : "STRIPE"}</h1>
                            <h1>Address: {order?.shippingAddress}</h1>
                            <h1>Order Created: {new Date(order?.createdAt).toLocaleString() || ''}</h1>
                        </div>

                        <div>
                            <div className="flex justify-between items-center sm:gap-2 py-1 border-2 px-1 bg-orange-100 text-center">
                                <h1 className="w-1/3 text-start">Title</h1>
                                <h1 className="w-1/3"> Price & Quantity</h1>
                                <h1 className="w-1/3">Amount</h1>
                            </div>
                            {order?.orderItems.map((item: Item) => <div key={item.id}>

                                <div className="flex justify-between items-center sm:gap-2 py-1 border-2 px-1 text-center">
                                    <div className="w-1/3 text-start">{item.title}</div>
                                    <div className="w-1/3 flex justify-center items-center gap-2 text-center">
                                        <h1 className="px-2">${item.price} x {item.quantity}</h1>
                                    </div>
                                    <div className="w-1/3 flex justify-center items-center text-center">
                                        <h1>{item.price * item.quantity}</h1>
                                    </div>
                                </div>
                            </div>)}
                            <div className="flex justify-end items-center font-bold py-2 border-2 bg-gray-100 mb-6">
                                <div className="w-2/3 sm:w-1/2 md:w-2/5 text-center sm:pr-6 md:pr-8">Total Amount:  ${order.totalAmount}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center mb-12">
                <button onClick={reactToPrintFn} className="text-md px-4 py-2 border-2 bg-blue-500 rounded-md text-white font-semibold">Print</button>
            </div>
        </div>
    );
};

export default PrintComponent;