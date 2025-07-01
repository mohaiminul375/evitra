import { MdLocationOn, MdManageAccounts } from "react-icons/md";
import { IoTimeSharp } from "react-icons/io5";
import { FaPencil, FaPhone, FaTrash, FaUserGroup } from "react-icons/fa6";
import { Button } from "../ui/button";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useDeleteEvent } from "@/app/my-event/api/route";
import { SyncLoader } from "react-spinners";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useState } from "react";
import UpdateEvent from "../Update/UpdateEvent";
import { Badge } from "../ui/badge";
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
const MyEventCard = ({ event }: EventProp) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { mutateAsync, isPending } = useDeleteEvent()
    const { _id, event_title, name, email, event_Date, location, description, contact, attendeeCount } = event;
    const currentDate = new Date().toISOString()
    const isExpired = currentDate > event_Date;
    // handle delete
    const handleDeleteEvent = async (id: string) => {
        // react confirm alert customization
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-6 w-full max-w-sm text-center shadow-xl">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">Are you sure?</h2>
                            <p className="text-sm text-gray-600 mb-4">
                                Do you really want to delete this event? This action cannot be undone.
                            </p>

                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={async () => {
                                        await mutateAsync(id)
                                        // Your delete logic
                                        // deleteEvent(id);
                                        onClose();
                                    }}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                                >
                                    Yes, Delete
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

            <div className="flex justify-between mt-4">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="text-base" variant='default'>{isPending ? <SyncLoader
                            color="black"
                            size={8}

                        /> : <span className="flex items-center gap-2"><FaPencil />Edit</span>}</Button>

                    </DialogTrigger>
                    <DialogContent className="md:max-w-4xl bg-white dark:bg-background dark:text-white">
                        <DialogHeader className="text-primary text-center">
                            <DialogTitle className="text-center">Edit The Event</DialogTitle>
                        </DialogHeader>
                        <UpdateEvent event={event}></UpdateEvent>
                    </DialogContent>
                </Dialog>

                <Button variant='default' >Attendee List</Button>
                <Button onClick={() => handleDeleteEvent(_id)} className="text-base text-red-700" variant='default' ><FaTrash /> Delete</Button>
            </div>
        </div>
    );
};

export default MyEventCard;