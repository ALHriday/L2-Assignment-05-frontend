import PrintComponent from "@/lib/components/PrintComponent";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/api/orders/${id}`);
    if (res.status === 404) {
        notFound();
    }
    const data = await res.json() || [];
    const order = data?.data;

    if (!order) return null;

    return (
        <div>
            <PrintComponent order={order} />
        </div>
    );
}
export default page;