import React from 'react';
import { FaPhone, FaUserGroup } from 'react-icons/fa6';
import { IoTimeSharp } from 'react-icons/io5';
import { MdLocationOn, MdManageAccounts } from 'react-icons/md';

const DetailEventCard = ({ event }) => {
    const { event_title, name, email, event_Date, location, description, contact, attendeeCount } = event;
    return (
        <div className="relative bg-white dark:bg-primary-foreground dark:text-white p-6 rounded-xl shadow-md flex flex-col gap-2">
            {/* status Badge */}
            {/* <div className="flex justify-end">
                <Badge variant={isExpired ? 'destructive' : "default"}>{isExpired ? 'expired' : 'active'}</Badge>
            </div> */}

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
                {description}
            </p>

            {/* Attendees */}
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-2 dark:text-white">
                <FaUserGroup className="text-lg" />
                <span><strong>Attendees:</strong> {attendeeCount}</span>
            </p>

            {/* Spacer */}
            <div className="flex-grow"></div>
        </div>
    );
};

export default DetailEventCard;