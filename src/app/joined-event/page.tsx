'use client'

import { useAuth } from "@/Provider/AuthProvider";
import { useGetJoinedEvent } from "./api/route";
import Loading from "../loading";
import JoinedEventCard from "@/components/Card/JoinedEventCard";
import PrivateRoute from "@/Router/PrivateRoute";

const JoinedEvent = () => {
    const { user } = useAuth()
    const { data: joined, isPending, isError, error } = useGetJoinedEvent(user?.email as string)
    if (isPending) {
        return <Loading />
    }
    if (isError) return <p>Error: {(error as Error)?.message || "Something went wrong!"}</p>;
    // console.log(data.event_id)
    return (
        <section>
            <title>Joined Event | Evitra</title>
            {/* Heading */}
            <div className='text-center'>
                <h2 className='text-3xl font-semibold dark:text-white'>Joined Event</h2>
                <p className='text-base mt-2 italic dark:text-white'>
                    See all event you wanna join.
                </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-4">
                {
                    joined?.map(list => <JoinedEventCard key={list?.event_id._id} list={list} />)
                }
            </div>
        </section>
    );
};

export default PrivateRoute(JoinedEvent);