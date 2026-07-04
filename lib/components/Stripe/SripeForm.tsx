"use client";

import {
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";

export default function StripeForm({ orderId }: { orderId: string }) {

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        if (!stripe || !elements) return;

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url:
                    `${window.location.origin}/payment/success?orderId=${orderId}`,
            },
        });

        if (error) {
            alert(error.message);
        }
    };

    return (
        <div className="w-9/12 m-auto p-4">
            <form onSubmit={handleSubmit}>
                <PaymentElement />
                <div className="text-right p-4">
                    <button className="px-6 py-2 bg-black shadow-md hover:border-2 hover:border-green-300 rounded-md text-white" type="submit">Pay Now</button>
                </div>
            </form>
        </div>
    );

}