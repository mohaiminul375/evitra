import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
interface ApiErrorResponse {
    message?: string;
}
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

// Join Event
export const useJoinEvent = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (joinEvent: object) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_LOCAL}/participants/join-event`, joinEvent)
            return data
        },
        mutationKey: ['join-event'],
        onSuccess: (data) => {
            console.log(data)
            if (data.success === true) {
                toast.success('Event created Successfully')
                queryClient.invalidateQueries({ queryKey: ['all-event'] })
                queryClient.invalidateQueries({ queryKey: ['all-event-user'] })
                queryClient.invalidateQueries({ queryKey: ['all-join-event'] })
            }
        }, onError: (error) => {
            //error.response.data.message
            const axiosError = error as AxiosError<ApiErrorResponse>;
            const existedError = axiosError?.response?.data?.message;
            console.log(existedError)
            if (existedError) {
                toast.error(existedError)
            } else if (error.message) {
                toast.error(error.message)
            } else {
                toast.error('failed to join event')
            }
        },
    })
    return mutation;
}