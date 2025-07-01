import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// get joined Event data
export const useGetJoinedEvent = (email: string) => {
    const { data, isPending, isError, error } = useQuery({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/participants/joined-event/${email}`)
            return data;
        },
        queryKey: ['participants-list']
    })

    return { data, isPending, isError, error }
}