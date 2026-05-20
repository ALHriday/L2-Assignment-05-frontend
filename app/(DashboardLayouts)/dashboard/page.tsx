import StatsCard from "@/lib/components/StatsCard";
import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";

const page = async () => {
    const session = await getSession();
    const user = session?.user;

    if (user?.role === "CUSTOMER") {
        redirect('/dashboard/customer/orders');
    }

    return (
        <div>
            <StatsCard userRole={user.role} />
        </div>
    );
};

export default page;