// import { Check } from 'lucide-react';

// interface PromoteCardProps {
//     id: string;
//     title: string;
//     description: string;
//     isSelected: boolean;
//     onSelect: (id: string) => void;
//     type: 'featured' | 'highlight';
// }

// export default function PromoteCard({
//     id,
//     title,
//     description,
//     isSelected,
//     onSelect,
//     type,
// }: PromoteCardProps) {
//     const isFeatured = type === 'featured';

//     return (
//         <div
//             onClick={() => onSelect(id)}
//             className={`flex flex-col p-5 rounded-xl border-2 cursor-pointer transition-all ${
//                 isSelected
//                     ? isFeatured
//                         ? 'border-blue-600 bg-blue-50/30'
//                         : 'border-amber-500 bg-amber-50/30'
//                     : 'border-gray-100 bg-white hover:border-gray-200'
//             }`}
//         >
//             <div className='flex items-center justify-between mb-4'>
//                 <div className='flex items-center gap-3'>
//                     <div
//                         className={`w-10 h-10 rounded-lg flex items-center justify-center ${
//                             isFeatured
//                                 ? 'bg-blue-100 text-blue-600'
//                                 : 'bg-amber-100 text-amber-600'
//                         }`}
//                     >
//                         {isFeatured ? (
//                             <i className='fa-solid fa-arrow-trend-up text-lg'></i>
//                         ) : (
//                             <i className='fa-solid fa-highlighter text-lg'></i>
//                         )}
//                     </div>
//                     <h4 className='font-bold text-gray-900'>{title}</h4>
//                 </div>
//                 <div
//                     className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
//                         isSelected
//                             ? isFeatured
//                                 ? 'border-blue-600 bg-blue-600'
//                                 : 'border-amber-500 bg-amber-500'
//                             : 'border-gray-300'
//                     }`}
//                 >
//                     {isSelected && (
//                         <Check
//                             size={12}
//                             className='text-white'
//                             strokeWidth={3}
//                         />
//                     )}
//                 </div>
//             </div>

//             <div
//                 className={`w-full aspect-video rounded-lg mb-4 flex items-center justify-center overflow-hidden border ${
//                     isFeatured
//                         ? 'border-blue-100 bg-blue-50'
//                         : 'border-amber-100 bg-amber-50'
//                 }`}
//             >
//                 <div className='flex flex-col gap-2 w-full px-4'>
//                     <div
//                         className={`h-2 rounded w-3/4 ${isFeatured ? 'bg-blue-200' : 'bg-amber-200'}`}
//                     />
//                     <div
//                         className={`h-2 rounded w-1/2 ${isFeatured ? 'bg-blue-200' : 'bg-amber-200'}`}
//                     />
//                     <div
//                         className={`h-8 rounded w-full border-2 ${isFeatured ? 'border-blue-400 bg-blue-100' : 'border-amber-400 bg-amber-100'}`}
//                     />
//                 </div>
//             </div>

//             <p className='text-xs text-gray-500 leading-relaxed'>
//                 {description}
//             </p>
//         </div>
//     );
// }
