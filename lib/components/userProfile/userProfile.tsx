"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/lib/auth-client";
import useUserSession from "@/lib/hooks/useUserSession";
import { userService } from "@/modules/users/users.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const UserProfile = () => {

    const { userSession } = useUserSession();
    const user = userSession as User;

    const [name, setName] = useState<string>(user?.name ?? '');
    const [phone, setPhone] = useState<string>(user?.phone ?? '');
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    const handleUpdateUserProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('phone', phone);

            if (image) {
                formData.append('image', image);
            }

            const result = await userService.updateUserProfile(formData);

            if (result.result.success) {
                toast.success('Your Profile Updated Successful.');
                router.push('/');
                router.refresh();
                return result.result;
            }

        } catch (err) {
            return err;
        } finally {
            setLoading(false);
        }
    }

    const handleCancel = () => {
        setName('');
        setPhone('');
        setImage(null);
        router.refresh();
        router.push('/');
    }

    return (
        <div className="w-10/12 md:w-6/12 lg:h-5/12 p-4 border-2 bg-gray-50 rounded-md">
            <h1 className="font-bold mb-3 mt-2">Update Your Profile</h1>
            <form className="w-full flex flex-col gap-8" onSubmit={handleUpdateUserProfile}>
                <div className="flex flex-col md:flex-row w-full gap-2">
                    <div className="w-full md:w-1/2">
                        <Label className="font-bold my-4">Name</Label>
                        <Input
                            type="text"
                            placeholder="Enter Your Name"
                            className="text-sm"
                            required
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <Label className="font-bold my-4">Phone</Label>
                        <Input
                            type="text"
                            placeholder="Enter Your Phone Number"
                            className="text-sm"
                            required
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                        />
                    </div>
                </div>
                <div>
                    <Label className="font-bold mb-4">Upload Image</Label>
                    <Input
                        type="file"
                        placeholder="Enter Your Picture"
                        className="text-sm"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                    />
                </div>


                <div className="flex gap-2 justify-end items-center">
                    <Button onClick={handleCancel} type="button" className="border bg-transparent border-cyan-600 hover:border-cyan-700 hover:bg-cyan-600/15 text-black">
                        Cancel
                    </Button>
                    <Button disabled={loading ? true : false} type="submit" className={`bg-cyan-600 hover:bg-cyan-700  text-white ${loading ? "animate-pulse" : ""}`}>
                        {loading ? 'Saving...' : 'Save'}
                    </Button>
                </div>

            </form>
        </div>
    );
};

export default UserProfile;