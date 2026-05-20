import Cart from "@/lib/components/cart/Cart";
import { getSession } from "@/lib/getSession";

const page = async () => {
    const session = await getSession();
    const user = session?.user;

    return (
        <div>
            <Cart user={user} />
        </div>
    );
};

export default page;