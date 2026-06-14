import Register from "@/components/form-multi-field-2";
import Link from "next/link";

const page = async () => {
    return (
        <div className="flex flex-col gap-4 justify-center items-center bg-[#F5F5F5] min-h-screen p-4">
            <Register />
            <div className="flex justify-center gap-1 text-sm text-muted-foreground">
                <p>Already have an account</p>
                <Link
                    href={`/login`}
                    className="font-medium text-primary hover:underline"
                >
                    Login
                </Link>
            </div>
        </div>
    );
};

export default page;