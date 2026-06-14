"use client"

import dynamic from "next/dynamic";

const DynamicCartItem = dynamic(() => import("@/lib/components/cart/Cart"), { ssr: false });

const DynamicCart = () => {
    return <DynamicCartItem />
};

export default DynamicCart;