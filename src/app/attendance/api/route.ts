import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// get all events participant list
export const useGetParticipants = (id: string) => {

    const { data, isPending, isError, error } = useQuery<Event[]>({
        queryFn: async () => {
            // Construct query parameters conditionally
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/participants/attendance/${id}`)
            return data;
        },
        queryKey: ['all-participants']
    })

    return { data, isPending, isError, error }
}