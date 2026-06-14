import DashboardLayout from "../DashboardLayout";

export const dynamic = "force-dynamic";

const layout = async ({ children }: { children: React.ReactNode }) => {

    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    )
};

export default layout;