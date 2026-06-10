import { Navigate, Outlet } from 'react-router-dom';
import DashboardTopbar from '../components/ui/CandidateTopbar';
import DashboardSidebar from '../components/ui/DashboardSidebar';
import ProtectedRoute from '../routes/ProtectedRoute';
import useAuth from '../contexts/auth/useAuth';

export default function CandidateLayout() {
    const { user } = useAuth();

    return (
        <ProtectedRoute allowedRoles={['SEEKER']}>
            {user && user.hasProfile === false ? (
                <Navigate to='/jobseeker/setup' replace />
            ) : (
            <div className='flex flex-col w-full h-screen bg-gray-50/40 font-sans antialiased overflow-hidden'>
                <DashboardTopbar />
                <div className='flex flex-1 min-w-0 overflow-hidden'>
                    <DashboardSidebar />

                    <main className='flex-1 p-8 overflow-y-auto w-full relative'>
                        <div className='max-w-6xl mx-auto w-full'>
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
            )}
        </ProtectedRoute>
    );
}
