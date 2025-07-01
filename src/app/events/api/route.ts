import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
interface ApiErrorResponse {
    message?: string;
}
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
interface GetProps {
    search: string,
    dateRange: string,
    todayDate: string,
}
// get join data
export const useGetJoinData = (email: string) => {
    const { data, isPending, isError, error } = useQuery<Event[]>({
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/participants/all-list/${email}`)
            return data;
        },
        queryKey: ['participants-list']
    })

    return { data, isPending, isError, error }
}
// get all event
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
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/participants/join-event`, joinEvent)
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
                queryClient.invalidateQueries({ queryKey: ['participants-list'] })
                queryClient.invalidateQueries({ queryKey: ['all-participants'] })
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
// cancel Join Event
export const useJoinCancel = (id: string) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async () => {
            const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/participants/cancel-join/${id}`)
            return data
        },
        mutationKey: ['cancel-join'],
        onSuccess: (data) => {
            console.log(data)
            if (data.success === true) {
                toast.success('Canceled join the event')
                queryClient.invalidateQueries({ queryKey: ['all-event'] })
                queryClient.invalidateQueries({ queryKey: ['all-event-user'] })
                queryClient.invalidateQueries({ queryKey: ['all-join-event'] })
                queryClient.invalidateQueries({ queryKey: ['participants-list'] })
                queryClient.invalidateQueries({ queryKey: ['all-participants'] })
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
                toast.error('failed to cancel join')
            }
        },
    })
    return mutation;
}