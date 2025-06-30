'use client'
import { MdLocationOn, MdManageAccounts } from "react-icons/md";
import { IoTimeSharp } from "react-icons/io5";
import { FaPhone, FaUserGroup } from "react-icons/fa6";
import { Button } from "../ui/button";
import { useAuth } from "@/Provider/AuthProvider";
import { confirmAlert } from "react-confirm-alert";
import { useGetJoinData, useJoinEvent } from "@/app/events/api/route";
import Loading from "@/app/loading";
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
    const { user } = useAuth();
    const { data: participants, isPending } = useGetJoinData(user?.email as string);
    const { mutateAsync } = useJoinEvent()
    const { _id, event_title, name, email, event_Date, location, description, contact, attendeeCount } = event;
    if (isPending) {
        return <Loading />
    }
    // console.log(participants)
    const isJoined = participants?.some((item) => item.event_id == _id);
    console.log(isJoined)

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
        <div className="bg-white dark:bg-primary-foreground dark:text-white p-5 rounded-xl shadow-md flex flex-col">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">{event_title}</h3>
            <p className="text-sm text-gray-600 mt-2 dark:text-white">
                <span className="flex items-center gap-1 mb-1">
                    <MdManageAccounts className="text-xl" />
                    <strong>Posted by:</strong> {name}
                </span>
                (<span className="text-primary">{email}</span>)
            </p>

            <p className="text-sm mt-2 flex items-center gap-2">
                <IoTimeSharp className="text-xl" /><strong>Date & Time:</strong> {new Date(event_Date).toLocaleString()}
            </p>

            <p className="text-sm mt-1 flex items-center gap-2">
                <MdLocationOn className="text-xl" /> <strong>Location:</strong> {location}
            </p>
            <p className="text-sm mt-1 flex items-center gap-2">
                <FaPhone className="text-sm" /> <strong>Contact:</strong> {contact}
            </p>

            <p className="text-gray-700 mt-2 dark:text-white">
                {description.slice(0, 90)}...
            </p>

            <p className="text-sm text-gray-500 mt-1 flex items-center gap-2 dark:text-white">
                <FaUserGroup className="text-xl" />   <strong>Attendees:</strong> {attendeeCount}
            </p>

            {/* Spacer to push buttons to bottom */}
            <div className="flex-grow"></div>

            <div className="flex justify-between mt-4">
                <Button className="disabled:ursor-not-allowed" disabled={isJoined} onClick={() => handleJoinEvent(_id)} variant='default' >Join Event</Button>
                <Button variant='default' >See More</Button>
                {/* <button className="text-sm text-blue-600 hover:underline">See More</button> */}
            </div>
        </div>
    );
};

export default EventCard;