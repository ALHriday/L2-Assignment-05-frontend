import React from 'react';
import CustomerLayout from './CustomerLayout';
import { getSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';

export const dynamic = "force-dynamic";

const layout = async ({ children }: { children: React.ReactNode }) => {
    const session = await getSession();
    if (session?.user?.role !== "CUSTOMER") {
        redirect('/');
    }
    return (
        <div>
            <CustomerLayout>
                {children}
            </CustomerLayout>
        </div>
    );
};

export default layout;