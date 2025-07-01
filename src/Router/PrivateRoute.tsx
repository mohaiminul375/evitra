import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/app/loading';
import { useAuth } from '@/Provider/AuthProvider';
// Private Route function
const PrivateRoute = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const ProtectedComponent = (props: P) => {
        const { user, loading } = useAuth();
        const router = useRouter();
        console.log(user, 'user in pro')
        useEffect(() => {
            if (loading) {
                <Loading />
                return;
            }
            if (!user) {
                router.replace('/login');
            } else {

            }
        }, [loading, user, router])

        if (!user) {
            return null;
        }

        return <WrappedComponent {...props} user={user} />;
    };

    return ProtectedComponent;
};

export default PrivateRoute;