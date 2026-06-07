import { Outlet } from 'react-router';
import AdminSidebar from '../pages/admin/components/AdminSidebar';
import AdminTopbar from '../pages/admin/components/AdminTopbar';

export default function AdminLayout() {
    return (
        <div className='flex h-screen bg-[#f8f9fa] overflow-hidden font-sans'>
            <AdminSidebar />
            <div className='flex-1 flex flex-col ml-64 overflow-hidden relative'>
                <AdminTopbar />
                <main className='flex-1 overflow-y-auto p-8 relative'>
                    <div className='max-w-400 mx-auto w-full h-full'>
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
