"use client"

import { Button } from "@/components/ui/button";
import useCart from "@/lib/hooks/useCart";
import useUserSession from "@/lib/hooks/useUserSession";
import { getErrorMessage } from "@/lib/types/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"

type FormValues = {
    name: string
    phone: string
    shippingAddress: string
    cashOnDelivery: boolean;
}



const Cart = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { cartItems, setCartItems } = useCart();
    const router = useRouter();

    const { userSession } = useUserSession();
    const user = userSession;

    const subTotal = cartItems?.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setIsLoading(true);
        const { name, phone, shippingAddress, cashOnDelivery } = data || {};

        const userId = user?.id;
        const orderItems = cartItems?.map((item) => { return { medicineId: item.id, quantity: item.quantity } }) || [];

        const orderData = { name, phone, shippingAddress, cashOnDelivery, orderItems, userId };

        try {
            const res = await fetch(`/api/orders`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
            });
            if (!res.ok) { throw new Error('failed to placed order!') };
            const result = await res.json();
            setCartItems([]);
            reset();
            router.push(`/checkout/${result?.data?.id}`);
        } catch (error) {
            return getErrorMessage(error);
        } finally {
            setIsLoading(false);
        }
    };

    const HandleDeleteItem = (id: string) => {
        setCartItems(prev => {
            return prev.filter(item => {
                if (item.id !== id) {
                    return item;
                }
            })
        })
    }


    const handleIncrementQuantity = (id: string) => {
        setCartItems(prev => {
            return prev.map(item => {
                if (item.id === id) {
                    return { ...item, quantity: item.quantity + 1 }
                }
                return item;
            })
        })
    }
    const handleDecrementQuantity = (id: string) => {
        setCartItems(prev => {
            return prev.map(item => {
                if (item.id === id && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 }
                }
                return item;
            })
        })
    }
    const handleClearAll = () => {
        setCartItems([]);
    }

    const handleCancel = () => {
        reset();
    }

    return (
        <div className="flex flex-col justify-center items-center gap-8 sm:p-4 mx-auto">
            <div className="w-full md:w-9/12 lg:h-5/12 md:p-4 border-2 bg-gray-50 rounded-md flex flex-col">
                <div className="flex justify-between items-center gap-4 py-2 border-b-2 bg-orange-200 px-2">
                    <h1 className="font-bold text-2xl p-2">Your Cart Items</h1>
                    <div>
                        {cartItems?.length ?
                            <Button className={`bg-red-500 cursor-pointer`} onClick={handleClearAll}>Clear All</Button>
                            : ''}
                    </div>
                </div>
                <table className="border-2">
                    <thead className="border-2">
                        <tr className="flex justify-between items-center text-center bg-orange-100 border-collapse">
                            <th className="p-1 text-start w-2/4">Title</th>
                            <th className="p-1 w-1/4"> Price & Quantity</th>
                            <th className="p-1text-end pr-8 w-1/4">Amount</th>
                        </tr>
                    </thead>
                    {cartItems && cartItems?.map(item => <tbody className="border-2" key={item.id}>
                        <tr className="flex justify-between items-center border-collapse border h-13">
                            <td className="w-2/4 h-full p-1">{item.title}</td>
                            <td className="w-1/4 h-full p-1  flex justify-center items-center gp-1 md:gap-4">
                                <span className="px-2">${item.price} x {item.quantity}</span>
                                <span className="flex justify-start items-center gap-1">
                                    <Button className="cursor-pointer" onClick={() => handleIncrementQuantity(item.id)}>+</Button>
                                    <Button className="cursor-pointer" onClick={() => handleDecrementQuantity(item.id)}>-</Button>
                                </span>
                            </td>
                            <td className="w-1/4 h-full p-1 flex justify-end items-center gap-4">
                                <span >{item.price * item.quantity}</span>
                                <span>
                                    <Button className='w-full p-0 bg-transparent cursor-pointer hover:bg-transparent' onClick={() => HandleDeleteItem(item.id)}>
                                        <Image
                                            src={`/deleteIcon.png`}
                                            alt="deleteIcon"
                                            width={30}
                                            height={30}
                                            priority
                                            title="Delete"
                                        />
                                    </Button>
                                </span>
                            </td>
                        </tr>
                    </tbody>)}
                    <tfoot className="border-2">
                        <tr className="border-2 flex justify-between items-center font-bold py-2 bg-gray-100 pr-8 md:pr-12">
                            <td></td>
                            <td></td>
                            <td>Total Amount:  ${subTotal}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div className="w-full md:w-9/12 lg:h-5/12 p-4 border-2 bg-gray-50 rounded-md">
                <h1 className="text-xl font-bold mb-3 mt-2">Delivery Information</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col md:flex-row gap-2">
                            <div className="flex flex-col gap-3 md:w-1/2">
                                <label className="flex flex-col gap-2 text-md font-bold ">Name:</label>
                                <input className="p-2 text-md border" {...register("name", { required: true })} placeholder="Enter your name" required />
                            </div>
                            <div className="flex flex-col gap-3 md:w-1/2">
                                <label className="flex flex-col gap-2 text-md font-bold ">Phone:</label>
                                <input className="p-2 text-md border" {...register("phone", { required: true, minLength: 11, maxLength: 11 })} placeholder="Enter your phone number" required />
                                {errors.phone && <p className="text-red-500 text-sm">Phone Number Must be 11 Digits!</p>}
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-4">
                                <label className="flex flex-col gap-2 text-md font-bold ">Address:</label>
                                <textarea className="p-2 text-md border min-h-16 max-h-30" {...register("shippingAddress", { required: true })} placeholder="Example: Village, P:O, P:S, District." required />
                            </div>
                            <div className="flex gap-2 items-center">
                                <input type="checkbox" className="p-2 text-xl font-bold border w-5 h-5 rounded-md" {...register("cashOnDelivery", { required: true })} required />
                                <label className="flex flex-col gap-2 text-md font-bold">CashOnDelivery</label>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button onClick={handleCancel} className={'my-4'}>Cancel</Button>
                        <Button disabled={cartItems?.length ? false : true} type="submit" className={`${isLoading && 'animate-pulse'} my-4`}>{isLoading ? "Placing Order..." : 'Place Order'}</Button>
                    </div>
                </form>
            </div>
        </div >
    );
};

export default Cart;