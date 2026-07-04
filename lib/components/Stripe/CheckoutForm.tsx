"use client";

import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import StripeForm from "./SripeForm";
import { stripePromise } from "@/lib/stripe";


export default function CheckoutForm({
    orderId,
}: {
    orderId: string;
}) {

    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {

        const createPaymentIntent = async () => {

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL!}/api/payment/create-payment-intent`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        orderId,
                    }),
                    credentials: 'include',
                }
            );

            const data = await res.json();

            setClientSecret(data.data?.clientSecret);
        };

        createPaymentIntent();

    }, [orderId]);

    if (!clientSecret) {
        return <p className="text-center my-4 animate-pulse">Loading...</p>;
    }

    return (

        <Elements
            stripe={stripePromise}
            options={{
                clientSecret,
            }}
        >
            <StripeForm orderId={orderId} />
        </Elements>
    );
}