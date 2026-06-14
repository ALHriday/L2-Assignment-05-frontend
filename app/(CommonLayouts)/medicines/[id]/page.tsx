import AddToCart from "@/lib/components/cart/AddToCart";
import Image from "next/image";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/api/medicines/${id}`, { cache: 'no-store' });
    if (res.status === 404) {
        notFound();
    }

    const data = await res.json();
    const medicine = data?.data;

    return (
        <div className="px-4 py-8 flex justify-center items-center">
            <div key={medicine?.id} className="flex flex-col md:flex-row gap-4 w-11/12 mx-auto">
                <div className="w-full md:w-4/10 h-50 relative p-4 border-2 rounded-md overflow-hidden">
                    <Image
                        className="rounded-md object-cover p-2"
                        src={medicine?.image}
                        alt={medicine?.title}
                        sizes="100vh"
                        fill
                        priority
                    />
                </div>
                <div className="w-full md:w-6/10 flex flex-col gap-4">
                    <div className="border-2 p-4 rounded-md">
                        <h2 className="text-sm md:text-xl font-bold mt-2">{medicine?.title}</h2>
                        <h3 className="text-gray-900 mt-1 text-[12px] md:text-md">{medicine?.manufacturer}</h3>
                        <div className="flex gap-12 mt-2 mb-2">
                            <p className="font-semibold">${medicine?.price}</p>
                            <p> <span className="font-bold">Q:</span> {medicine?.stock}</p>
                        </div>
                        <div>
                            <p className="font-bold">Description: </p>
                            <p>{medicine?.description}</p>
                        </div>
                    </div>
                    <div className="border-2 p-4 rounded-md">
                        <AddToCart medicine={medicine} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;