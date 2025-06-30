import { MdLocationOn, MdManageAccounts } from "react-icons/md";
import { IoTimeSharp } from "react-icons/io5";
import { FaPhone, FaUserGroup } from "react-icons/fa6";
import { Button } from "../ui/button";

const EventCard = ({ event }) => {
    const { event_title, name, email, event_Date, location, description, contact, attendeeCount } = event;
    console.log(event)
    return (
        <div className="bg-white p-5 rounded-xl shadow-md flex flex-col">
            <h3 className="text-xl font-bold text-gray-800">{event_title}</h3>
            <p className="text-sm text-gray-600 mt-2">
                <span className="flex items-center gap-1 mb-1">
                    <MdManageAccounts className="text-xl" />
                    <strong>Posted by:</strong> {name}
                </span>
                (<span className="text-primary">{email}</span>)
            </p>

            <p className="text-sm mt-1 flex items-center gap-2">
                <IoTimeSharp className="text-xl" /><strong>Date & Time:</strong> {new Date(event_Date).toLocaleString()}
            </p>

            <p className="text-sm mt-1 flex items-center gap-2">
                <MdLocationOn className="text-xl" /> <strong>Location:</strong> {location}
            </p>
            <p className="text-sm mt-1 flex items-center gap-2">
                <FaPhone className="text-sm" /> <strong>Contact:</strong> {contact}
            </p>

            <p className="text-gray-700 mt-2">
                {description.slice(0, 90)}...
            </p>

            <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                <FaUserGroup className="text-xl" />   <strong>Attendees:</strong> {attendeeCount}
            </p>

            {/* Spacer to push buttons to bottom */}
            <div className="flex-grow"></div>

            <div className="flex justify-between mt-4">
                <Button variant='default' >Join Event</Button>
                <Button variant='default' >See More</Button>
                {/* <button className="text-sm text-blue-600 hover:underline">See More</button> */}
            </div>
        </div>
    );
};

export default EventCard;