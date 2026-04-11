"use client";

import {
  FileUpload,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";


interface ProfileFormData {
  name: string;
  phone: string;
  image: string;
  avatar: string;
}

interface SettingsProfile1Props {
  defaultValues?: Partial<ProfileFormData>;
  onSave?: (data: ProfileFormData) => void;
  className?: string;
}

export interface UserData {
  name: string;
  phone?: string;
  image?: string;
}

const SettingsProfile1 = ({
  defaultValues = {
    // name: user?.name,
    // phone: user?.phone,
    // image: user?.image,
    avatar:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar8.jpg",
  },
  className,
}: SettingsProfile1Props) => {
  const [avatarFiles, setAvatarFiles] = useState<File[]>([]);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/auth/get-session`, { credentials: "include" }).then(res => res.json()).then(data => setUser(data?.user))
  }, [])



  // const initials = defaultValues.name
  //   ?.split(" ")
  //   .map((n) => n[0])
  //   .join("")
  //   .toUpperCase();

  // Get preview URL from uploaded file or use default avatar
  const avatarPreview =
    avatarFiles.length > 0
      ? URL.createObjectURL(avatarFiles[0])
      : defaultValues.avatar;

  return (
    <Card className={cn("w-full max-w-lg", className)}>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Update your personal information and profile picture
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avatar Upload */}
        <FileUpload
          value={avatarFiles}
          onValueChange={setAvatarFiles}
          accept="image/*"
          maxFiles={1}
          maxSize={2 * 1024 * 1024}
        >
          <div className="flex items-center gap-4">
            <FileUploadTrigger >
            </FileUploadTrigger>
          </div>

          <FileUploadList className="mt-3">
            {avatarFiles.map((file, index) => (
              <FileUploadItem
                key={index}
                value={file}
                className="rounded-lg border bg-muted/30 p-2"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium"></p>
                  <p className="text-xs text-muted-foreground">

                  </p>
                </div>
                <FileUploadItemDelete></FileUploadItemDelete>
              </FileUploadItem>))}
          </FileUploadList>
        </FileUpload>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your Name"
              defaultValue={defaultValues.name}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              placeholder="Enter phone"
              defaultValue={defaultValues.phone}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Image</Label>
          <Input
            id="image"
            type="file"
            placeholder="Select your Image"
            defaultValue={defaultValues.image}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  );
};

export { SettingsProfile1 };
