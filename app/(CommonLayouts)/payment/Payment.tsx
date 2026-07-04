import CheckoutForm from "@/lib/components/Stripe/CheckoutForm";

const Payment = ({ orderId }: { orderId: string }) => {
    return (
        <div>
            <CheckoutForm orderId={orderId} />
        </div>
    );
};

export default Payment;