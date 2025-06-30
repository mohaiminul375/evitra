import { useQuery } from "@tanstack/react-query";
import axios from "axios";
interface Event {
    event_title: string;
}
// get all to by email
export const useGetEvents = () => {

    const { data, isPending, isError, error } = useQuery<Event>({
        queryFn: async () => {
            // Construct query parameters conditionally
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/events/all-events`)
            return data;
        },
        queryKey: ['all-event']
    })

    return { data, isPending, isError, error }
}