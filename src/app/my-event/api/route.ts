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
interface ParamsProp {
    email: string | undefined,
}

interface UpdateProps {
    _id?: string,
    newEvent?: object,
}

// get all events by email
export const useGetUserEvents = ({ email }: ParamsProp) => {

    const { data, isPending, isError, error } = useQuery<Event[]>({
        queryFn: async () => {
            // Construct query parameters conditionally
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/events/all-events/${email}`)
            return data;
        },
        queryKey: ['all-event-user']
    })

    return { data, isPending, isError, error }
}
// updateTodo
export const useUpdateEvent = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async ({ _id, newEvent }: UpdateProps) => {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/events/update-event/${_id}`, newEvent)
            return data
        },
        mutationKey: ['update-event'],
        onSuccess: (data) => {
            console.log(data)
            if (data.success === true) {
                toast.success('Event updated Successfully')
                queryClient.invalidateQueries({ queryKey: ['all-event'] })
                queryClient.invalidateQueries({ queryKey: ['all-event-user'] })
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
                toast.error('failed to update')
            }
        },
    })
    return mutation;
}
// delete a Event
export const useDeleteEvent = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (id: string) => {
            const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/events/${id}`)
            return data;
        },
        mutationKey: ['delete-event'],
        onSuccess: (data) => {
            if (data.success === true) {
                toast.success('Event Deleted successfully')
                queryClient.invalidateQueries({ queryKey: ['all-event'] })
                queryClient.invalidateQueries({ queryKey: ['all-event-user'] })
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
                toast.error('failed to delete')
            }

        },
    })
    return mutation;
}