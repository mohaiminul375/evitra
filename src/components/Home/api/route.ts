import { useQuery } from "@tanstack/react-query";
import axios from "axios";
interface Event {
    _id: string,
    event_id?: string,
    event_title: string,
    name: string,
    email: string,
    event_Date: string,
    location: string,
    description: string,
    contact: string,
    attendeeCount: number,
}
// get highlight data
export const useGetHighlight = () => {
    const { data, isPending, isError, error } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/summary/highlight`)
            return data;
        },
        queryKey: ['highlight']
    })

    return { data, isPending, isError, error }
}
// get events for home data
export const useGetHomeEvent = () => {
    const { data, isPending, isError, error } = useQuery<Event[]>({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/summary/home-event`)
            return data;
        },
        queryKey: ['home-event']
    })

    return { data, isPending, isError, error }
}