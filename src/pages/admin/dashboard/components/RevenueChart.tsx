import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

interface MetricPoint {
    label: string;
    value: number;
}

interface RevenueChartProps {
    data: MetricPoint[];
}

export default function RevenueChart({ data }: RevenueChartProps) {
    const chartData = data.map((item) => ({
        name: item.label,
        revenue: item.value,
    }));

    return (
        <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-112 flex flex-col'>
            <h3 className='text-lg font-bold text-gray-900 mb-6'>
                Revenue Overview
            </h3>
            <div className='flex-1 w-full'>
                {chartData.length === 0 ? (
                    <div className='h-full flex items-center justify-center text-gray-500 text-sm'>
                        No revenue data available
                    </div>
                ) : (
                    <ResponsiveContainer width='100%' height='100%'>
                        <BarChart
                            data={chartData}
                            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                        >
                            <CartesianGrid
                                strokeDasharray='3 3'
                                vertical={false}
                                stroke='#f3f4f6'
                            />
                            <XAxis
                                dataKey='name'
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6b7280', fontSize: 12 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6b7280', fontSize: 12 }}
                                tickFormatter={(value) => `$${value}`}
                            />
                            <Tooltip
                                cursor={{ fill: '#f3f4f6' }}
                                contentStyle={{
                                    borderRadius: '8px',
                                    border: 'none',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                }}
                            />
                            <Bar
                                dataKey='revenue'
                                fill='#2563eb'
                                radius={[4, 4, 0, 0]}
                                barSize={40}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}
