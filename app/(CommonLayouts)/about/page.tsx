import AboutMediStore from "@/lib/components/aboutMediStore/AboutMediStore";

const page = () => {
    return (
        <div className="flex flex-col text-md md:text-xl text-gray-600">
            <div className="p-4">
                <h1 className="text-gray-700 text-2xl mb-2"><strong>MediStore</strong></h1>
                Welcome to <strong>MediStore</strong>, your trusted online pharmacy and healthcare partner. Our mission is to make quality medicines and healthcare products easily accessible, affordable, and convenient for everyone.
            </div>
            <AboutMediStore />
        </div>
    );
};

export default page;