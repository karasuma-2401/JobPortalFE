import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "IT & Software", value: 400 },
  { name: "Finance", value: 300 },
  { name: "Healthcare", value: 300 },
  { name: "Education", value: 200 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#6366f1"];

export default function IndustryPieChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-200 flex flex-col">
      <h3 className="text-lg font-bold text-gray-900 mb-2">Jobs by Industry</h3>
      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              wrapperStyle={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#4b5563",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%+18px)] text-center pointer-events-none">
          <p className="text-3xl font-black text-gray-900">1.2K</p>
          <p className="text-xs font-bold text-gray-400 uppercase">
            Total Jobs
          </p>
        </div>
      </div>
    </div>
  );
}
