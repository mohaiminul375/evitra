import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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
// get all events
export const useGetEvents = () => {

    const { data, isPending, isError, error } = useQuery<Event[]>({
        queryFn: async () => {
            // Construct query parameters conditionally
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/events/all-events`)
            return data;
        },
        queryKey: ['all-event']
    })

    return { data, isPending, isError, error }
}