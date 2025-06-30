'use client'

import EventCard from "@/components/Card/EventCard";
import Loading from "../loading";
import { useGetEvents } from "./api/route";

const Events = () => {
    const { data: events = [], isPending, isError, error } = useGetEvents();
    if (isPending) {
        return <Loading />
    }
    if (isError) return <p>Error: {(error as Error)?.message || "Something went wrong!"}</p>;

    return (
        <section>
            {/* Heading */}
            <div className='text-center'>
                <h2 className='text-3xl font-semibold'>All Events</h2>
                <p className='text-base mt-2 italic'>
                    Explore all the exciting events happening in one place. <br /> From tech meetups to fun activities, stay updated and never miss out!
                </p>
            </div>
            {/* Filter */}
            <div className='my-8'>

            </div>
            {/* Data */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-4">
                {
                    events?.map((event) => (
                        <EventCard key={event._id} event={event} />
                    ))
                }
            </div>

        </section>
    );
};

export default Events;