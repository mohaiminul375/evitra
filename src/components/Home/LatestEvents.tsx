'use client'

import Loading from "@/app/loading";
import { useGetHomeEvent } from "./api/route";
import DetailEventCard from "../Card/DetailEventCard";

const LatestEvents = () => {
    const { data: events, isPending, isError, error } = useGetHomeEvent();
    if (isPending) {
        return <Loading />
    }
    if (isError) return <p>Error: {(error as Error)?.message || "Something went wrong!"}</p>;
    return (
        <div>
            {/* Heading */}
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white underline decoration-primary/60 underline-offset-4">
                    Latest Event
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                    See our latest Event.
                </p>
            </div>
            <div className="text-center flex justify-center">
                {
                    events?.length === 0 ? <p className="text-red-700 font-bold text-xl text-center">No Events Found</p> : ""
                }
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-4">
                {
                    events?.map(event => <DetailEventCard key={event._id} event={event} />)
                }
            </div>
        </div>
    );
};

export default LatestEvents;