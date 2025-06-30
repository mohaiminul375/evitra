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
interface GetProps {
    search: string,
    dateRange: string,
    todayDate: string,
}
// get all events
export const useGetEvents = ({ search, dateRange, todayDate }: GetProps) => {

    const { data, isPending, isError, error } = useQuery<Event[]>({
        queryFn: async () => {
            // Construct query parameters conditionally
            const params = new URLSearchParams();
            if (search) params.append('search', search);
            if (dateRange) params.append('sort', dateRange);
            if (todayDate) params.append('todayDate', todayDate);
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/events/all-events?${params.toString()}`)
            return data;
        },
        queryKey: ['all-event', { search, dateRange, todayDate }]
    })

    return { data, isPending, isError, error }
}