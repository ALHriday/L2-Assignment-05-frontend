import UserProfile from "@/lib/components/userProfile";
import { getSession } from "@/lib/getSession";

const page = async () => {
    const { user } = await getSession();

    return (
        <div className="flex justify-center items-center p-4 mx-auto">
            <UserProfile userData={user} />
        </div>
    );
};

export default page;