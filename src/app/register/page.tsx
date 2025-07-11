'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import { useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import toast from 'react-hot-toast';
import axios from "axios"
import { useCreateUser } from './api/rote';
import { SyncLoader } from 'react-spinners';
const LottiePlayer = dynamic(() => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player), { ssr: false });
type Inputs = {
    name: string,
    email: string,
    password: string,
    avatar: string;
}


const Register = () => {
    const { mutateAsync, isPending, } = useCreateUser();
    console.log(isPending)
    const [showPassword, setShowPassword] = useState(false);
    const [images, setImages] = useState<ImageListType>([]);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>();
    // //read the image
    // const readFileAsBase64 = (file: File): Promise<string> => {
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);

    //         reader.onload = () => {
    //             if (typeof reader.result === 'string') {
    //                 const base64 = reader.result.split(',')[1];
    //                 resolve(base64);
    //             } else {
    //                 reject(new Error("Failed to read file as base64"));
    //             }
    //         };

    //         reader.onerror = () => {
    //             reject(new Error("Error reading file"));
    //         };
    //     });
    // };
    const onSubmit: SubmitHandler<Inputs> = async (user_data) => {
        if (images.length === 0 || !images[0]?.file) {
            toast.error("Image is required!");
            return;
        }
        const file = images[0].file; // get first file from FileList
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "evitra-cloud"); // from Cloudinary
        formData.append("cloud_name", "da5uoyv65"); // optional in unsigned
        try {
            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/da5uoyv65/image/upload",
                formData,
                { headers: { "content-type": "multipart/form-data" } }
            );
            console.log(response.data.url)
            user_data.avatar = response?.data?.url
            console.log(user_data)
            // user data save to DB
            await mutateAsync(user_data)
            reset()
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "An error occurred");
        }
    }

    // Handle image change
    const handleImageChange = (imageList: ImageListType) => {
        setImages(imageList);
    };



    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 px-4 lg:px-16 items-center">
            <head>
                <title>Register | Evitra</title>
            </head>
            {/* Left side: Animation */}
            <div className="hidden md:flex justify-center">
                <LottiePlayer
                    autoplay
                    loop
                    src="/auth.json"
                    style={{ height: 'auto' }}
                    className="w-full max-w-md"
                />
            </div>

            {/* Right side: Form */}
            <div className="bg-foreground dark:bg-primary-foreground shadow-md rounded-xl p-6 sm:p-8 text-white">
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
                <div className="mb-6 flex justify-center">
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
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5">
                    {/* Name */}
                    <div className="grid gap-1.5">
                        <Label htmlFor="name">
                            Your Name <span className="text-red-600 font-bold">*</span>
                        </Label>
                        <Input
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
                    {/* Password */}
                    <div className="grid gap-1.5">
                        <Label htmlFor="password">
                            Password <span className="text-red-600 font-bold">*</span>
                        </Label>
                        <div className="relative">
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Enter Password"
                                className="pr-10"
                                required
                                {...register("password", {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters long'
                                    }
                                })}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? (
                                    <EyeOffIcon className="w-5 h-5 text-white" />
                                ) : (
                                    <EyeIcon className="w-5 h-5 text-white" />
                                )}
                            </Button>
                            {errors.password && <p className='text-red-700 text-sm'>{errors.password.message}</p>}
                        </div>
                    </div>

                    {/* Submit */}
                    <Button
                        variant="default"
                        size="lg"
                        className="w-full font-semibold"
                    >
                        {isPending ? <SyncLoader
                            color="black"
                            size={8}

                        /> : "Register"}
                    </Button>
                </form>
                {/* Navigate To Login Page */}
                <div className='mt-3 text-center'>
                    <p className='text-sm'>Already Have an Account? <Link
                        href='/login'
                        className='hover:underline cursor-pointer'>Please login</Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Register;