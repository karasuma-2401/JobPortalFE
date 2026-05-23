export default function JobTableHeader() {
  return (
    <div className="flex items-center px-6 py-3.5 bg-gray-50 rounded-lg text-xs font-bold text-gray-500 tracking-wider">
      <div className="flex-1 uppercase">Job</div>
      <div className="w-[180px] uppercase">Date Applied</div>
      <div className="w-[120px] uppercase">Status</div>
      <div className="w-[140px] text-center uppercase">Action</div>
    </div>
  );
}