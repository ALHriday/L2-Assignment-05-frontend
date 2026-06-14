import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
    const session = await getSession();

    if (session) {
        redirect('/');
    }

    return (
        <div>
            {children}
        </div>
    );
};

export default layout;