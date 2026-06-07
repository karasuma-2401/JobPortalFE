import { Outlet } from 'react-router-dom';
import CandidateTopBar from '../components/ui/CandidateTopbar'; 

export default function CandidateFullLayout() {
    return (
        <div className='min-h-screen flex flex-col font-sans text-gray-900 bg-bg-white'>
            <CandidateTopBar />
            
            <main className='flex-1 w-full'>
                <Outlet />
            </main>
        </div>
    );
}