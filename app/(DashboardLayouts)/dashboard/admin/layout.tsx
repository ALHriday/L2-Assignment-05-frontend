import { getSession } from '@/lib/getSession';
import AdminLayout from './AdminLayout';
import { redirect } from 'next/navigation';

export const dynamic = "force-dynamic";

const layout = async ({ children }: { children: React.ReactNode }) => {
    const session = await getSession();

    if (session?.user?.role !== "ADMIN") {
        redirect('/');
    }

    return (
        <AdminLayout>
            {children}
        </AdminLayout>
    );
};

export default layout;