'use client'

import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useParams } from "next/navigation";
import { useGetParticipants } from "../api/route";
import Loading from "@/app/loading";
import AttendanceTable from "@/components/Table/AttendanceTable";

const Attendees = () => {
    const { id } = useParams();
    const { data, isPending, error, isError } = useGetParticipants(id as string);
    if (isPending) {
        return <Loading />
    }
    if (isError) return <p>Error: {(error as Error)?.message || "Something went wrong!"}</p>;
    console.log(data)
    return (
        <div>
            {/* Heading */}
            <div className="text-center">
                <h2 className='text-3xl font-semibold dark:text-white'>Attendee List of <br /> {data?.title}</h2>
                <p className='text-base mt-2 italic dark:text-white'>
                    See attendance list of the event
                </p>
            </div>
            <div className="mt-10">
                <Table className="bg-white dark:bg-primary-foreground dark:text-white">
                    <TableHeader>
                        <TableRow className="text-center">
                            <TableHead className="w-[50px]">#</TableHead>
                            <TableHead className="text-center">Name & Email</TableHead>
                            <TableHead className="text-center">Registration Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    {/* Table Body */}
                    <TableBody>
                        {data?.attendance?.map((list, index) => (
                            <AttendanceTable
                                key={list._id}
                                list={list}
                                idx={index}
                            />


                        ))}
                    </TableBody>
                </Table>
            </div>
        </div >
    );
};

export default Attendees;