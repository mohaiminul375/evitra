
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
interface ApiErrorResponse {
    message?: string;
}
// create a Event
export const useCreateEvent = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (newEvent: object) => {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/events/create-event`, newEvent)
            return data
        },
        mutationKey: ['create-event'],
        onSuccess: (data) => {
            console.log(data)
            if (data.success === true) {
                toast.success('Event created Successfully')
                queryClient.invalidateQueries({ queryKey: ['all-event'] })
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
                toast.error('failed to create event')
            }
        },
    })
    return mutation;
}
