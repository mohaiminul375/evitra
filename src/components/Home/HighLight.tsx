'use client'

import Loading from "@/app/loading";
import { useGetHighlight } from "./api/route";

const HighLight = () => {
    const { data, isPending, isError, error } = useGetHighlight();
    if (isPending) {
        return <Loading />
    }
    if (isError) return <p>Error: {(error as Error)?.message || "Something went wrong!"}</p>;
    return (
        <div className="py-12 px-4">
            {/* Heading */}
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white underline decoration-primary/60 underline-offset-4">
                    Engagement Highlights
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                    See how our community is growing and engaging.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
                {/* Card 1 */}
                <div className="bg-primary text-white p-6 rounded-xl shadow-lg w-full max-w-xs hover:scale-105 transition-transform duration-300">
                    <h3 className="text-lg font-semibold mb-1">Total Users</h3>
                    <p className="text-3xl font-bold">{data.userCount}</p>
                </div>

                {/* Card 2 */}
                <div className="bg-foreground text-white p-6 rounded-xl shadow-lg w-full max-w-xs hover:scale-105 transition-transform duration-300">
                    <h3 className="text-lg font-semibold mb-1">Total Events</h3>
                    <p className="text-3xl font-bold">{data.eventCount}</p>
                </div>

                {/* Card 3 */}
                <div className="bg-white text-black p-6 rounded-xl shadow-lg w-full max-w-xs border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform duration-300">
                    <h3 className="text-lg font-semibold mb-1">Total Attendees</h3>
                    <p className="text-3xl font-bold">{data.attendeeCount}</p>
                </div>
            </div>
        </div>

    );
};

export default HighLight;