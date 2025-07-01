'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { setHours, setMinutes } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "@/Provider/AuthProvider";
import { useCreateEvent } from "./api/route";
import { SyncLoader } from "react-spinners";
import PrivateRoute from "@/Router/PrivateRoute";

type Inputs = {
    event_title: string,
    name: string,
    description: string,
    event_Date: string | Date,
    location: string,
    email: string | undefined,
    contact: string,
    priority: string | undefined,
}
const AddEvent = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>();

    const { mutateAsync, isPending, } = useCreateEvent();
    const { user } = useAuth()
    const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null)
    const baseDate = new Date();
    const excludedTimes = [
        setHours(setMinutes(baseDate, 0), 17),
        setHours(setMinutes(baseDate, 30), 18),
        setHours(setMinutes(baseDate, 30), 19),
        setHours(setMinutes(baseDate, 30), 17),
    ];

    // react hook form
    const onSubmit: SubmitHandler<Inputs> = async (event_data) => {
        event_data.event_Date = selectedDateTime?.toISOString() as string;
        event_data.email = user?.email;
        event_data.name = user?.name as string;
        // console.log(event_data)
        // save to DB
        await mutateAsync(event_data)
        reset()
        setSelectedDateTime(null)
    }
    return (
        <section>
            <head>
                <title>Add Event | Evitra</title>
            </head>
            <div className='border-2 border-black rounded-md md:max-w-3xl mx-auto py-10 p-6 bg-foreground'>
                {/* Heading */}
                <div className='text-center text-white'>
                    <h2 className='text-3xl font-semibold'>Create a New Event</h2>
                    <p className='text-base mt-2 italic'>Ready to make something amazing happen? <br /> Fill in the details and let the fun begin your event starts here</p>
                </div>
                {/* Form */}
                < form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-xl mx-auto text-white mt-8">
                    {/* Title */}
                    <div className='space-y-2'>
                        <Label htmlFor="event_title">Event Title <span className="text-red-600 font-bold">*</span></Label>
                        <Input    {...register('event_title')} id="event_title" placeholder="enter your event title" name="event_title" required />
                        {errors.event_title && <p className="text-sm text-red-500">{errors.event_title.message}</p>}
                    </div>

                    {/* Description */}
                    <div className='space-y-2'>
                        <Label htmlFor="description">Description <span className="text-red-600 font-bold">*</span></Label>
                        <Textarea    {...register('description')} id="description" name="description" placeholder="enter your description event" required />
                        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                    </div>

                    <div>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>

                            {/*  Date */}
                            <div className="space-y-2">
                                <Label htmlFor="event_Date">Event Date <span className="text-red-600 font-bold">*</span></Label>
                                <DatePicker
                                    required
                                    className="border-2 rounded-md py-1 w-full"
                                    selected={selectedDateTime}
                                    onChange={(date) => setSelectedDateTime(date)}
                                    minDate={new Date()}
                                    showTimeSelect
                                    excludeTimes={excludedTimes}
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                />
                            </div>
                            {/* Location */}
                            <div className='space-y-2'>
                                <Label htmlFor="location">Location <span className="text-red-600 font-bold">*</span></Label>
                                <Input    {...register('location')} id="location" placeholder="enter event location" name="location" required />
                                {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
                            </div>
                            {/* tel */}
                            <div className='space-y-2'>
                                <Label htmlFor="contact">Contact<span className="text-red-600 font-bold">*</span></Label>
                                <Input       {...register('contact', {
                                    pattern: {
                                        value: /^\d{11}$/,
                                        message: 'Must be a valid 11 digit phone number',
                                    },
                                })} id="contact" placeholder="enter contact number" name="contact" required />
                                {errors.contact && <p className="text-sm text-red-500">{errors.contact.message}</p>}
                            </div>
                        </div>
                    </div>
                    <Button type="submit" className="w-full mt-5">{isPending ? <SyncLoader
                        color="black"
                        size={8}

                    /> : "Create Event"}</Button>
                </form>
            </div>
        </section>
    );
};

export default PrivateRoute(AddEvent);