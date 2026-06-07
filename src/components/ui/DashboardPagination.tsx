import { ArrowLeft, ArrowRight } from 'lucide-react';

interface DashboardPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function DashboardPagination({
    currentPage,
    totalPages,
    onPageChange,
}: DashboardPaginationProps) {
    if (totalPages <= 1) return null;

    let startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);
    if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
    }

    const pageNumbers = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
    );

    return (
        <div className='flex items-center justify-center gap-3 pt-8 pb-4'>
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className='w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 text-gray-400 hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors'
            >
                <ArrowLeft size={20} />
            </button>

            {pageNumbers.map((page) => {
                const isActive = page === currentPage;
                return (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`w-10 h-10 flex items-center justify-center rounded-full text-base font-bold transition-all ${
                            isActive
                                ? 'bg-primary-500 text-white shadow-sm font-extrabold'
                                : 'text-gray-500 hover:bg-gray-50'
                        }`}
                    >
                        {page < 10 ? `0${page}` : page}
                    </button>
                );
            })}

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className='w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 text-primary-400 hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors'
            >
                <ArrowRight size={20} />
            </button>
        </div>
    );
}
