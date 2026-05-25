import { MapPin, Clock, ArrowRight } from "lucide-react";

interface Job {
  id: string;
  title: string;
  type: string;
  location: string;
  salary: string;
}

interface OpenJobsListProps {
  jobs: Job[];
  onViewAll: () => void;
}

export default function OpenJobsList({ jobs, onViewAll }: OpenJobsListProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Open Positions</h2>
        <button
          onClick={onViewAll}
          className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          View All <ArrowRight size={16} />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-lg border border-gray-100 hover:border-blue-500 hover:shadow-sm transition-all group gap-4"
          >
            <div>
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {job.title}
              </h3>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Clock size={14} /> {job.type}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} /> {job.location}
                </span>
                <span className="font-semibold text-gray-700">
                  {job.salary}
                </span>
              </div>
            </div>
            <button className="px-5 py-2 text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-md transition-colors shrink-0">
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
