"use client"

import { Button } from "@/components/ui/button"
import useAllCategories from "@/lib/hooks/useAllCategories";
import { Category } from "@/lib/types/types";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import toast, { Toaster } from "react-hot-toast";


type FormValues = {
    title: string;
    image: string;
    description: string;
    manufacturer: string;
    price: number;
    stock: number;
    categoryId: string;
}

const CreateMedicine = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { register, handleSubmit, reset } = useForm<FormValues>();

    const { allCategory } = useAllCategories();


    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setIsLoading(true);
        const { title, image, description, manufacturer, price, stock, categoryId } = data || {};

        const formData = new FormData();

        formData.append('title', title);
        formData.append('image', image[0]);
        formData.append('description', description);
        formData.append('manufacturer', manufacturer);
        formData.append('price', String(price));
        formData.append('stock', String(stock));
        formData.append('categoryId', categoryId);

        try {
            const res = await fetch(`/api/seller/medicines`, {
                method: "POST",
                body: formData,
                credentials: 'include',
            })
            const medicine = await res.json();

            if (medicine) {
                toast.success('Medicine Created successful.');
                reset();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleCancel = () => {
        reset();
    }

    return (
        <div className="w-full lg:h-5/12 p-4 border-2 bg-gray-50 rounded-md">
            <h1 className="text-xl font-bold mb-6 bg-cyan-700 text-white rounded-sm p-4 shadow-sm">Create medicine</h1>
            <Toaster position="top-center" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6 p-2">
                    <div className="flex flex-col md:flex-row gap-2">
                        <div className="flex flex-col gap-3 md:w-1/2">
                            <label className="flex flex-col gap-2 text-md font-semibold ">Title:</label>
                            <input type="text" className="p-2 text-md border rounded-md bg-gray-200/35" {...register("title", { required: true })} placeholder="Enter medicine title" required />
                        </div>
                        <div className="flex flex-col gap-3 md:w-1/2">
                            <label className="flex flex-col gap-2 text-md font-semibold ">Manufacturer Name:</label>
                            <input type="text" className="p-2 text-md border rounded-md bg-gray-200/35" {...register("manufacturer", { required: true })} placeholder="Enter manufacturer name" required />
                        </div>
                        <div className="flex flex-col gap-3 md:w-1/2">
                            <label className="flex flex-col gap-2 text-md font-semibold ">Price:</label>
                            <input className="p-2 text-md border rounded-md bg-gray-200/35" type="number" {...register("price", { required: true, valueAsNumber: true })} placeholder="Enter medicine price" required />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2">
                        <div className="flex flex-col gap-3 md:w-1/2">
                            <label className="flex flex-col gap-2 text-md font-semibold ">Image:</label>
                            <input className="p-2 text-md border rounded-md bg-gray-200/35" type="file" {...register("image")} />
                        </div>
                        <div className="flex flex-col gap-3 md:w-1/2">
                            <label className="flex flex-col gap-2 text-md font-semibold ">Category Name:</label>
                            <select className="p-2 text-md border rounded-md bg-gray-200/35" itemType="text" {...register("categoryId", { required: true })}>
                                <option value="">Select</option>
                                {allCategory && allCategory.map((item: Category) => <option key={item.id} value={item.id}>{item.name}</option>)}
                            </select>
                        </div>
                        <div className="flex flex-col gap-3 md:w-1/2">
                            <label className="flex flex-col gap-2 text-md font-semibold ">Stock:</label>
                            <input className="p-2 text-md border rounded-md bg-gray-200/35" type="number" {...register("stock", { required: true, valueAsNumber: true })} placeholder="Enter medicine stock" required />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-4">
                            <label className="flex flex-col gap-2 text-md font-semibold ">Description:</label>
                            <textarea className="p-2 text-md border rounded-md bg-gray-200/35 min-h-16 max-h-30" {...register("description", { required: true })} placeholder="Enter medicine description..." required />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <Button onClick={handleCancel} className={'my-4 bg-cyan-700 text-white'}>Cancel</Button>
                    <Button disabled={isLoading ? true : false} type="submit" className={` ${isLoading && 'animate-pulse'} my-4 bg-cyan-700 text-white`}>{isLoading ? "Creating Medicine..." : "Create Medicine"}</Button>
                </div>
            </form>
        </div>
    );
};

export default CreateMedicine;