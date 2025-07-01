'use client'

import { useAuth } from "@/Provider/AuthProvider";
import { useGetUserEvents } from "./api/route";
import Loading from "../loading";
import MyEventCard from "@/components/Card/MyEventCard";
import PrivateRoute from "@/Router/PrivateRoute";

const MyEvent = () => {
    const { user } = useAuth()
    const email = user?.email
    const { data: events, isPending, isError, error } = useGetUserEvents({ email })
    if (isPending) {
        return <Loading />
    }
    if (isError) return <p>Error: {(error as Error)?.message || "Something went wrong!"}</p>;
    return (
        <section>
            <head>
                <title>My Event | Evitra</title>
            </head>
            {/* Heading */}
            <div className='text-center'>
                <h2 className='text-3xl font-semibold dark:text-white'>My Events</h2>
                <p className='text-base mt-2 italic text-gray-600 dark:text-white'>
                    Here you can manage, edit, or delete all the events you’ve created. <br /> Stay in control and keep your events up to date.
                </p>
            </div>
            {/* filter */}
            <div className="my-8">

            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-4">
                {
                    events?.map((event) => (
                        <MyEventCard key={event._id} event={event} />
                    ))
                }
            </div>
            {/* Data */}
        </section>
    );
};

export default PrivateRoute(MyEvent);