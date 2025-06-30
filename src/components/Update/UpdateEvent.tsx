import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { setHours, setMinutes } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "@/Provider/AuthProvider";
import { SyncLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { useUpdateEvent } from "@/app/my-event/api/route";
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
interface Event {
    _id: string,
    event_title: string,
    name: string,
    email: string,
    event_Date: string,
    location: string,
    description: string,
    contact: string,
    attendeeCount: number,
}
interface EventProp {
    event: Event,
}
const UpdateEvent = ({ event }: EventProp) => {
    const { mutateAsync, isPending } = useUpdateEvent()
    const { user } = useAuth();
    const { _id, event_title, event_Date, location, description, contact } = event;
    const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(new Date(event_Date))
    const baseDate = new Date();
    const excludedTimes = [
        setHours(setMinutes(baseDate, 0), 17),
        setHours(setMinutes(baseDate, 30), 18),
        setHours(setMinutes(baseDate, 30), 19),
        setHours(setMinutes(baseDate, 30), 17),
    ];
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (newEvent) => {
        newEvent.event_Date = selectedDateTime?.toISOString() as string;
        newEvent.email = user?.email;
        newEvent.name = user?.name as string;
        console.log(newEvent)
        // save to DB
        await mutateAsync({ _id, newEvent })

    }
    return (
        <div>
            < form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-xl mx-auto mt-8">
                {/* Title */}
                <div className='space-y-2'>
                    <Label htmlFor="event_title">Event Title <span className="text-red-600 font-bold">*</span></Label>
                    <Input    {...register('event_title')} id="event_title" placeholder="enter your event title" name="event_title" defaultValue={event_title} required />
                    {errors.event_title && <p className="text-sm text-red-500">{errors.event_title.message}</p>}
                </div>

                {/* Description */}
                <div className='space-y-2'>
                    <Label htmlFor="description">Description <span className="text-red-600 font-bold">*</span></Label>
                    <Textarea    {...register('description')} id="description" name="description" placeholder="enter your description event" defaultValue={description} required />
                    {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                </div>

                <div>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>

                        {/*  Date */}
                        <div className="space-y-2">
                            <Label htmlFor="event_Date">Event Date <span className="text-red-600 font-bold">*</span></Label>
                            <DatePicker
                                required
                                className="border-2 rounded-md py-1"
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
                            <Input defaultValue={location}  {...register('location')} id="location" placeholder="enter event location" name="location" required />
                            {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
                        </div>
                        {/* tel */}
                        <div className='space-y-2'>
                            <Label htmlFor="contact">Contact<span className="text-red-600 font-bold">*</span></Label>
                            <Input defaultValue={contact}     {...register('contact', {
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

                /> : "Update Event"}</Button>
            </form>
        </div>
    );
};

export default UpdateEvent;