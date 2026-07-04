import Payment from "../Payment";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    return (
        <div>
            <Payment orderId={id} />
        </div>
    );
};

export default page;