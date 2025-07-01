'use client'
import { MdLocationOn, MdManageAccounts } from "react-icons/md";
import { IoTimeSharp } from "react-icons/io5";
import { FaPhone, FaUserGroup } from "react-icons/fa6";
import { Button } from "../ui/button";
import { useAuth } from "@/Provider/AuthProvider";
import { confirmAlert } from "react-confirm-alert";
import { useGetJoinData, useJoinEvent } from "@/app/events/api/route";
import Loading from "@/app/loading";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import UpdateEvent from "../Update/UpdateEvent";
import { useState } from "react";
import DetailEventCard from "./DetailEventCard";
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
const EventCard = ({ event }: EventProp) => {
       const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { user } = useAuth();
    const { data: participants, isPending } = useGetJoinData(user?.email as string);
    const { mutateAsync } = useJoinEvent()
    const { _id, event_title, name, email, event_Date, location, description, contact, attendeeCount } = event;
    const currentDate = new Date().toISOString()
    if (isPending) {
        return <Loading />
    }
    // console.log(participants)
    const isJoined = participants?.some((item) => item.event_id == _id);
    // console.log(isJoined)

    const isExpired = currentDate > event_Date
    const handleJoinEvent = (id: string) => {
        const joinReq = {
            name: user?.name,
            email: user?.email,
            event_id: id
        }
        console.log(joinReq)
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-6 w-full max-w-sm text-center shadow-xl">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">Are you sure?</h2>
                            <p className="text-sm text-gray-600 mb-4">
                                Do you really want to Join this Event
                            </p>

                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={async () => {
                                        await mutateAsync(joinReq)
                                        onClose();
                                    }}
                                    className="bg-foreground cursor-pointer text-white px-4 py-2 rounded-md text-sm font-medium"
                                >
                                    Yes, Join
                                </button>
                                <button
                                    onClick={onClose}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                );
            },
        });
    }
    return (
        <div className="relative bg-white dark:bg-primary-foreground dark:text-white p-6 rounded-xl shadow-md flex flex-col gap-2">
            {/* status Badge */}
            <div className="flex justify-end">
                <Badge variant={isExpired ? 'destructive' : "default"}>{isExpired ? 'expired' : 'active'}</Badge>
            </div>

            <h3 className="text-xl font-bold text-gray-800 dark:text-white">{event_title}</h3>

            {/* Organizer */}
            <p className="text-sm text-gray-600 mt-1 dark:text-white flex items-center gap-2">
                <MdManageAccounts className="text-lg" />
                <span>
                    <strong>Posted by:</strong> {name} (<span className="text-primary">{email}</span>)
                </span>
            </p>

            {/* Date & Time */}
            <p className="text-sm mt-1 flex items-center gap-2">
                <IoTimeSharp className="text-lg text-gray-700 dark:text-white" />
                <span><strong>Date & Time:</strong> {new Date(event_Date).toLocaleString()}</span>
            </p>

            {/* Location */}
            <p className="text-sm mt-1 flex items-center gap-2">
                <MdLocationOn className="text-lg text-gray-700 dark:text-white" />
                <span><strong>Location:</strong> {location}</span>
            </p>

            {/* Contact */}
            <p className="text-sm mt-1 flex items-center gap-2">
                <FaPhone className="text-base text-gray-700 dark:text-white" />
                <span><strong>Contact:</strong> {contact}</span>
            </p>

            {/* Description */}
            <p className="text-gray-700 mt-2 dark:text-white text-sm">
                {description.slice(0, 90)}...
            </p>

            {/* Attendees */}
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-2 dark:text-white">
                <FaUserGroup className="text-lg" />
                <span><strong>Attendees:</strong> {attendeeCount}</span>
            </p>

            {/* Spacer */}
            <div className="flex-grow"></div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center gap-3 mt-4">
                <Button
                    className="disabled:cursor-not-allowed"
                    disabled={isJoined || isExpired}
                    onClick={() => handleJoinEvent(_id)}
                    variant="default"
                >
                    {isJoined ? "Joined" : "Join Event"}
                </Button>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline">See More</Button>

                    </DialogTrigger>
                    <DialogContent className="md:max-w-4xl bg-white dark:bg-background dark:text-white">
                        <DialogHeader className="text-primary text-center">
                            <DialogTitle className="text-center">Details of event</DialogTitle>
                        </DialogHeader>
                        <DetailEventCard event={event}/>
                    </DialogContent>
                </Dialog>

            </div>
        </div >

    );
};

export default EventCard;