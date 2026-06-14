"use client"

import { useEffect, useState } from "react";
import { CartItemsData } from "../types/types";

const useCart = () => {
    const [isCartLoading, setIsCartLoading] = useState(true);
    const [cartItems, setCartItems] = useState<CartItemsData[]>(() => {
        if (typeof window !== 'undefined') {
            try {
                const storedData = localStorage.getItem('cartItems');
                return storedData ? JSON.parse(storedData) : [];
            } catch {
                return [];
            } finally {
                setIsCartLoading(false);
            }
        }
    });

    useEffect(() => {
        if (!isCartLoading) {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    }, [cartItems, isCartLoading]);

    return { isCartLoading, cartItems, setCartItems, cartItemsLen: cartItems?.length || 0 };
};

export default useCart;