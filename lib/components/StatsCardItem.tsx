"use client"

const StatsCardItem = ({ revenue, title, icon }: {
    revenue: number, title: string, icon: string
}) => {
    const showRevenue = `${revenue < 10 ? "0" + revenue : revenue}`;

    return (
        <div className="flex md:justify-center items-center text-2xl semibold p-2 bg-slate-100 border-2 border-cyan-500 shadow-md rounded-md">
            <h1 className="text-4xl border-r-2 p-2">{icon}</h1>
            <div className="p-2 flex flex-col gap-1">
                <h1>{title}</h1>
                <p>{showRevenue}</p>
            </div>
        </div>
    );
};

export default StatsCardItem;