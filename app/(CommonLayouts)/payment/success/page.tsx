import Link from "next/link";
interface Props {
    searchParams: Promise<{
        orderId?: string;
    }>;
}
const page = async ({
    searchParams,
}: Props) => {
    const { orderId } = await searchParams;

    if (!orderId) {
        return <h1>Invalid payment request.</h1>;
    }

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL!}/api/orders/${orderId}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        return <h1 className="my-4 text-center">Order not found.</h1>;
    }

    const { data: order } = await res.json();

    return (
        <div className="max-w-xl mx-auto py-10 text-center">
            <h1 className="text-3xl font-bold text-green-600">
                ✅ Payment Successful
            </h1>

            <p className="mt-4">
                Thank you for your purchase.
            </p>

            <div className="mt-6 space-y-2">
                <p>
                    <strong>Order ID:</strong> {order.id}
                </p>

                <p>
                    <strong>Payment Status:</strong> {order.payment?.status}
                </p>

                <p>
                    <strong>Order Status:</strong> {order.status}
                </p>
            </div>

            <Link
                href={`/checkout/${order.id}`}
                className="mt-8 inline-block rounded bg-blue-600 px-5 py-2 text-white"
            >
                View Invoice
            </Link>
        </div>
    );
}

export default page;