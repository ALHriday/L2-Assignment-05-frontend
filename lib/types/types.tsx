
export interface UserData {
    name: string;
    phone: string;
    image: string;
}
export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    image?: string | null;
    role?: Role;
    status: string;
}


export interface Medicine {
    id: string;
    title: string;
    image: string;
    price: number;
    stock: number;
    manufacturer: string;
    description: string;
}

export interface Categories {
    category: Category;
}

export interface Category {
    id: string;
    name: string;
    createdAt: Date;
}

export interface CartItem {
    name: string;
    orderItems: Item[];
    phone: string;
}

export interface Item {
    id: string;
    medicineId: string;
    orderId: string;
    price: number
    quantity: number
    title: string;
}

export interface CartData {
    id: string;
}

export interface CartItemsData {
    id: string;
    title: string;
    price: number;
    quantity: number;
}
export interface Order {
    id: string;
    title: string;
    totalAmount: number;
    quantity: number;
    cashOnDelivery: boolean;
    name: string;
    orderItems: Item[];
    phone: string;
    shippingAddress: string;
    userId?: string;
    createdAt: Date;
}

export enum Role {
    ADMIN = "ADMIN",
    SELLER = "SELLER",
    CUSTOMER = "CUSTOMER",
}

export type SortField = 'price' | 'manufacturer' | 'createdAt';
export type SortOrder = 'asc' | 'desc';

export interface Manufacturer {
    manufacturer: string;
}

export const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) {
        return error.message;
    }
    return String(error) || "Something went wrong!";
}