"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useCart from "@/lib/hooks/useCart";
import useCategoryData from "@/lib/hooks/useCategoryData";
import useMedicinesData from "@/lib/hooks/useMedicinesData";
import { Category, Manufacturer, Medicine, SortField, SortOrder } from "@/lib/types/types";
import Image from "next/image";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Carrousel from "../Carrousel";
import Link from "next/link";
import { GrImage } from "react-icons/gr";
import { FaCartPlus } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import Pagination from "../pagination/pagination";
import { LucideSettings2, SearchIcon } from "lucide-react";
import useManufacturer from "@/lib/hooks/useManufacturer";


const Medicines = () => {
    const [search, setSearch] = useState<string>('');
    const [m, setM] = useState<string>('');
    const [sortField, setSortField] = useState<SortField>('price');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
    const [categoryId, setCategoryId] = useState<string>('');
    const [skip, setSkip] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { data, isLoading } = useMedicinesData({ search, m, sortField, sortOrder, categoryId, skip });

    const medicines = data?.data || [];

    const { categories, isLoading: loadingCategory } = useCategoryData();
    const { setCartItems } = useCart();
    const { manufacturer } = useManufacturer();
    const currentPath = usePathname();

    const uniqueManufacturer = [...new Set(manufacturer?.map((item: Manufacturer) => item.manufacturer))] as string[];

    const handleAddToCart = (medicine: Medicine) => {
        const { id, title, price } = medicine;

        setCartItems((prev) => {
            const exist = prev.find(item => item.id === id);
            if (exist) {
                return prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { id, title, price, quantity: 1 }];
        });
        toast.success(`${title} Added to the Cart.`);
    };


    return (

        <div className="px-4">
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className="w-full mx-auto gap-4 py-4 justify-between items-center relative">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-9 relative">
                        <SearchIcon className="absolute w-10 h-13 top-0 left-2 p-2 rounded-md font-bold" />
                        <Input
                            className="pl-12 pr-4 py-6 rounded-xl focus-visible:ring-2 outline-0"
                            placeholder="Search your medicines..."
                            type="text"
                            name="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="col-span-3 flex gap-2 items-center relative lg:p-4">
                        <div className="flex gap-2 items-center select-none cursor-pointer font-bold" onClick={() => setIsOpen(!isOpen)}>
                            <span>Sort:</span> <LucideSettings2 /></div>
                        <div className="relative">

                            {isOpen && <div className="w-72 p-3 flex flex-col gap-3 absolute top-6 right-0 z-50 bg-white rounded-md shadow-md border">
                                <div className="flex gap-2">
                                    <label className="text-gray-600">Sort By: </label>
                                    <select className="p-2 border w-full rounded-md" onChange={(e) => setSortField(e.target.value as SortField)} name="Sort" id="" value={sortField}>
                                        <option className="rounded-md" value="price">Price</option>
                                        <option className="rounded-md" value="manufacturer">Manufacturer</option>
                                        <option className="rounded-md" value="createdAt">Newest</option>
                                    </select>
                                </div>
                                <div className="flex gap-2">

                                    <label className="text-gray-600">Order By: </label>

                                    <select className="p-2 border w-full rounded-md" onChange={(e) => setSortOrder(e.target.value as SortOrder)} name="Sort" id="" value={sortOrder}>
                                        <option className="rounded-md" value="asc">Ascending</option>
                                        <option className="rounded-md" value="desc">Descending</option>
                                    </select>
                                </div>

                                <div className="flex gap-2">

                                    <label className="text-gray-600">Manufactured By: </label>

                                    <select className="p-2 border w-full rounded-md" onChange={(e) => setM(e.target.value)} name="manufacturer" value={m}>
                                        <option className="rounded-md" value="" >Default</option>
                                        {uniqueManufacturer?.map((name) =>
                                            <option key={name} value={name}>{name}</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                </div>
                {search &&
                    <div className="w-full md:w-9/12 flex flex-col justify-start items-start flex-wrap gap-4 absolute top-20 left-0 z-30 bg-slate-50 p-2 md:px-4 md:py-6 min-h-screen border rounded-md">
                        {medicines && medicines.map((medicine: Medicine) =>
                            <div key={medicine.id} className="p-2 rounded-md shadow-md z-20 flex justify-between gap-2 min-w-75 md:w-100">
                                <Link className="flex gap-4 w-full" href={`/medicines/${medicine?.id}`}>
                                    <div className="relative w-3/12 md:w-4/12">
                                        <Image
                                            className="rounded-md object-cover w-full"
                                            src={medicine?.image}
                                            alt={medicine?.title}
                                            fill
                                            priority
                                            sizes="100vh"
                                        />
                                    </div>
                                    <div className="w-9/12 md:w-8/12">
                                        <h2 className="text-sm md:text-md font-bold">{medicine?.title}</h2>
                                        <h3 className="text-sm text-gray-900">{medicine?.manufacturer}</h3>
                                        <p className="text-sm md:text-md">stock: {medicine.stock}</p>
                                    </div>
                                </Link>

                                <div className="flex flex-col justify-between items-end gap-2">
                                    <p className="font-semibold">${medicine.price}</p>
                                    <Button onClick={() => handleAddToCart(medicine as Medicine)}><FaCartPlus /></Button>
                                </div>
                            </div>
                        )}
                    </div>}
            </div>


            <div className="flex flex-col gap-4 relative">
                <div className="w-auto h-auto">
                    {currentPath === '/' && <Carrousel />}
                </div>
                <div>
                    <div className={`bg-slate-50 py-4 sm:col-span-3 flex flex-col gap-2 rounded-md`}>
                        <h1 className="text-2xl md:text-4xl font-bold pl-2">Product Categories</h1>
                        {loadingCategory ? (<div className="flex gap-2 overflow-auto rounded-md shadow-sm p-2 mx-2">
                            {Array.from({ length: 6 }).map((_, i) => <div className="rounded-md p-2 border shadow-sm flex items-center bg-slate-200 w-26 h-10" key={i}>
                                <button className="cursor-pointer text-sm md:text-md font-medium md:font-bold"></button>
                            </div>)}
                        </div>) :
                            (<div className="flex gap-2  overflow-x-auto rounded-md shadow-sm p-2 mx-2">
                                <div className="rounded-md p-2 shadow-sm flex items-center bg-[#DCFDDC] border-2 border-slate-400">
                                    <button className="cursor-pointer text-sm md:text-md font-medium md:font-bold px-4 " onClick={() => setCategoryId('')}>All</button>
                                </div>
                                {categories?.map((c: Category) => <div className={`${categoryId === c.id ? "bg-slate-100 border-2 border-slate-400" : ''} rounded-md p-2 border shadow-sm flex items-center`} key={c?.id}>
                                    <button className={`w-full cursor-pointer text-sm md:text-md font-medium md:font-bold line-clamp-1`} onClick={() => setCategoryId(c.id)}>{c?.name}</button>
                                </div>)}
                            </div>)
                        }
                    </div>
                    {isLoading &&
                        <div className="flex justify-center items-center md:justify-start flex-wrap gap-4 mb-6">
                            {Array.from({ length: 10 }).map((_, i) =>
                                <div key={i} className="w-44 md:w-56 p-2 rounded-md gap-2 shadow-md flex flex-col justify-between animate-pulse">
                                    <div className="w-36 md:w-52 h-20 md:h-32 rounded-md object-cover bg-slate-300 flex justify-center items-center">
                                        < GrImage className="text-2xl text-gray-500"></GrImage>
                                    </div>

                                    <h2 className="text-sm md:text-md font-bold mt-2 w-full p-2 bg-slate-300 rounded-md"></h2>
                                    <h3 className="text-gray-900 mt-1 text-[12px] md:text-md w-full p-2 bg-slate-300 rounded-md"></h3>
                                    <div className="flex justify-between mt-2 mb-2 w-full p-2">
                                        <p className="font-semibold p-2 bg-slate-300 rounded-md w-10"></p>
                                        <p className="p-2 bg-slate-300 rounded-md w-10"></p>
                                    </div>
                                    <Button className='w-full p-2'></Button>
                                </div>)}
                        </div>}

                    <div className="flex justify-center md:justify-start md:items-center flex-wrap gap-3 md:gap-4 mb-6">
                        {medicines && medicines.map((medicine: Medicine) =>
                            <div key={medicine.id} className="w-36 md:w-56 rounded-md gap-1 md:gap-2 shadow-md flex flex-col justify-between p-1">
                                <Link href={`/medicines/${medicine.id}`}>
                                    <div className="relative w-full h-28 md:h-36 overflow-hidden rounded-md">
                                        <Image
                                            className="object-cover"
                                            src={medicine?.image}
                                            alt={medicine?.title}
                                            fill
                                            sizes="(max-width: 768px) 176px, 224px"
                                            priority
                                        />
                                    </div>

                                    <h2 className="text-sm md:text-md font-semibold mt-1 md:mt-2 line-clamp-1">{medicine.title}</h2>
                                    <h3 className="text-gray-900 mt-1 text-[12px] md:text-md line-clamp-1">{medicine.manufacturer}</h3>

                                </Link>
                                <div className="flex flex-col gap-1">
                                    <div className="flex justify-between">
                                        <p className="text-sm md:text-md font-semibold">${medicine.price}</p>
                                        <p className="text-sm md:text-md">{medicine.stock}</p>
                                    </div>
                                    <Button onClick={() => handleAddToCart(medicine as Medicine)} className='w-full'>Add to cart</Button>
                                </div>
                            </div>)}
                    </div>
                </div>
            </div>
            {currentPath === '/medicines' && <div>
                <Pagination skip={skip} setSkip={setSkip} />
            </div>}
        </div>
    );
};

export default Medicines;