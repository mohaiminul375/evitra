'use client'
import Loading from "../app/loading";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { createContext } from "react";
interface User {
    _id?: string;
    email?: string;
    name?: string;
    avatar: string;
}
interface UserContextType {
    email?: string;
    user?: User | null;
    loading: boolean;
    error?: string | null;
    logOut: () => void;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
}
const AuthContext = createContext<UserContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [token, setToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    // Logout and redirect to login page
    const logOut = useCallback(() => { //use call back for memorize and prevent re-rendering
        localStorage.removeItem('token');
        setUser(null);
        router.replace('/login');
    }, [router]);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem('token');
            if (!storedToken) {
                setLoading(false);
                return
            }
            // Fetch user for stay logged in
            const fetchUser = async () => {
                try {
                    setLoading(true);
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/user-data`, {
                        headers: {
                            authorization: `Bearer ${storedToken}`,
                        }
                    });

                    if (!response) return;

                    if (response?.data?.user) {
                        console.log(response);
                        setUser(response.data.user);
                    } else {
                        setError('User data not found');
                    }

                } catch (error) {
                    // if error is AxiosError and status is 403
                    if (axios.isAxiosError(error)) {
                        if (error.response?.status === 403) {
                            logOut();
                        }
                        setError(error?.message);
                    } else {
                        setError('An unexpected error occurred');
                    }
                } finally {
                    setLoading(false);
                }
            };

            fetchUser();
        }
    }, [token, logOut]); // Run on mount and when token changes


    return (
        <AuthContext.Provider value={{ user, loading, error, logOut, setToken }}>
            {loading ? <div><Loading /></div> : error ? <div>{error}</div> : children}
        </AuthContext.Provider>
    );
};

// Custom hook to access the context to all over site
export const useAuth = (): UserContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('Failed to process......');
    }
    return context;
};