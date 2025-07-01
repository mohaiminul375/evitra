'use client'
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useAuth } from "@/Provider/AuthProvider";
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";
import { useUpdateProfile } from "./api/route";
import { useRouter } from "next/navigation";
type Inputs = {
    name: string,
    email: string,
    password: string,
    avatar: string;
}
const UpdateProfile = () => {
    // const router = useRouter()
    const updateUser = useUpdateProfile();
    const { user } = useAuth();
    const [images, setImages] = useState<ImageListType>([]);
    console.log(images)
    const {
        register,
        handleSubmit,
    } = useForm<Inputs>();

    // Handle image change
    const handleImageChange = (imageList: ImageListType) => {
        setImages(imageList);
    };
    const onSubmit: SubmitHandler<Inputs> = async (user_data) => {
        console.log(user_data);

        try {
            // If image is provided, upload to ImgBB
            if (images.length > 0 && images[0]?.file) {
                const file = images[0].file; // get first file from FileList
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", "evitra-cloud"); // from Cloudinary
                formData.append("cloud_name", "da5uoyv65"); // optional in unsigned

                const response = await axios.post(
                    "https://api.cloudinary.com/v1_1/da5uoyv65/image/upload",
                    formData,
                    { headers: { "content-type": "multipart/form-data" } }
                );
                console.log(response.data.url)
                const img_url = response?.data?.url

                if (!img_url) {
                    toast.error('Error from the image server. Please try again or contact the developer.');
                    return;
                }

                user_data.avatar = img_url;
            } else {
                // If no image, use previous avatar
                user_data.avatar = user?.avatar as string;
            }

            console.log(user_data);
            await updateUser.mutateAsync({ _id: user?._id, user_data });
            setImages([]);

        } catch (error) {
            console.error("Error during submission:", error);
            toast.error(error instanceof Error ? error.message : "An error occurred");
        }
    };
    return (
        <section className="border max-w-2xl mx-auto p-4 rounded-md py-10 shadow-2xl bg-foreground text-white">
            <div className='text-center '>
                <h2 className="text-2xl font-semibold">Update Your Profile</h2>
                <p className=" mt-1">
                    Fill in the form below to Update Your Profile.
                </p>
            </div>
            <div className="my-2 flex justify-center">
                {images?.length == 0 && <Avatar className="w-20 h-20">
                    <AvatarImage className="w-20" width='20' src={user?.avatar} alt="avatar" />
                    <AvatarFallback />
                </Avatar>}
                {images.length > 0 && (
                    <Image
                        height={80}
                        width={80}
                        src={images[0]?.data_url}
                        alt="preview"
                        className=" rounded-full"
                    />
                )}
                
            </div>
            <div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5">
                    {/* Name */}
                    <div className="grid gap-1.5">
                        <Label htmlFor="name">
                            Your Name <span className="text-red-600 font-bold">*</span>
                        </Label>
                        <Input
                            defaultValue={user?.name}
                            type="text"
                            id="name"
                            placeholder="Enter Name"
                            required
                            {...register('name')}
                        />
                    </div>
                    {/* Email */}
                    <div className="grid gap-1.5">
                        <Label htmlFor="email">
                            Email <span className="text-red-600 font-bold">*</span>
                        </Label>
                        <Input
                            disabled
                            defaultValue={user?.email}
                            type="email"
                            id="email"
                            placeholder="Enter Email"
                            required
                            {...register('email')}
                        />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="nid">Profile Photo<span className='text-red-700 font-bold'>*</span></Label>
                        <ImageUploading
                            multiple
                            value={images}
                            onChange={handleImageChange}
                            dataURLKey="data_url"
                            acceptType={['jpg', 'png', 'jpeg']}

                        >
                            {({ onImageUpload, dragProps }) => (
                                <div className="space-y-3">
                                    <Button
                                        type="button"
                                        variant="default"
                                        className="w-full"
                                        {...dragProps}
                                        onClick={onImageUpload}
                                    >
                                        Upload Image
                                    </Button>
                                </div>
                            )}
                        </ImageUploading>
                    </div>
                    {/* Submit */}
                    <Button
                        variant="default"
                        size="lg"
                        className="w-full font-semibold"
                    >
                        Update Profile
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default UpdateProfile;