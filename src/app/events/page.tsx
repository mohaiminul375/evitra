'use client'

import EventCard from "@/components/Card/EventCard";
import Loading from "../loading";
import { useGetEvents } from "./api/route";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { FaFilterCircleXmark } from "react-icons/fa6";
import Head from "next/head";
// export const generateMetadata = async () => {
//     return {
//         title: 'Events Page'
//     }
// }
const Events = () => {
    const [todayDate, setTodayDate] = useState('');
    const [dateRange, setDateRange] = useState('')
    // handle search
    const [search, setSearch] = useState<string>('')
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearch((e.target as HTMLFormElement).search.value);
    }
    const { data: events = [], isPending, isError, error } = useGetEvents({ search, dateRange, todayDate });
    if (isPending) {
        return <Loading />
    }
    if (isError) return <p>Error: {(error as Error)?.message || "Something went wrong!"}</p>;
    const resetFilter = () => {
        setSearch('')
        setDateRange('')
        setTodayDate('')
    }
    return (
        <section>
            <head>
                <title>All Events | Evitra</title>
            </head>
                {/* <meta name="description" content='' /> */}

            {/* Heading */}
            <div className='text-center'>
                <h2 className='text-3xl font-semibold dark:text-white'>All Events</h2>
                <p className='text-base mt-2 italic dark:text-white'>
                    Explore all the exciting events happening in one place. <br /> From tech meetups to fun activities, stay updated and never miss out!
                </p>
            </div>
            {/* Filter */}
            <div className='my-8'>
                <div className="w-full max-w-3xl border border-primary rounded-lg p-4 flex flex-col md:flex-row items-center gap-4 mx-auto bg-white dark:bg-primary-foreground">
                    <form
                        onSubmit={handleSearch}
                        className="flex w-full md:w-2/3">
                        <Input
                            name='search'
                            type="text"
                            placeholder="enter title"
                            className="rounded-r-none border-r-0"
                        />
                        <Button className="rounded-l-none">
                            <Search className="h-4 w-4 mr-2" />
                            Search
                        </Button>
                    </form>

                    {/* Dropdown */}
                    <Select
                        defaultValue={dateRange}
                        onValueChange={(value) => setDateRange(value)}
                    >
                        <SelectTrigger className="w-full md:w-[250px]">
                            <SelectValue placeholder="Date Range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="current_week">Current Week</SelectItem>
                            <SelectItem value="last_week">Last Week</SelectItem>
                            <SelectItem value="current_month">current Month</SelectItem>
                            <SelectItem value="last_month">Last Month</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button onClick={() => setTodayDate('today')} variant='default' >Today</Button>
                    <Button onClick={resetFilter} className="flex items-center" variant='default' ><FaFilterCircleXmark /> Clear</Button>
                </div>
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