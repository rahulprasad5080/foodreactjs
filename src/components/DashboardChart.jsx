import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardChart = () => {
    const data = [
        { name: 'Jan', commission: 0, earning: 0 },
        { name: 'Feb', commission: 0, earning: 0 },
        { name: 'Mar', commission: 0, earning: 0 },
        { name: 'April', commission: 0, earning: 0 },
        { name: 'May', commission: 0, earning: 0 },
        { name: 'Jun', commission: 0, earning: 0 },
        { name: 'Jul', commission: 164, earning: 1410 },
        { name: 'Aug', commission: 0, earning: 0 },
        { name: 'Sep', commission: 0, earning: 0 },
        { name: 'Oct', commission: 0, earning: 0 },
        { name: 'Nov', commission: 0, earning: 0 },
        { name: 'Dec', commission: 0, earning: 0 },
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-700 text-lg flex items-center">
                    <span className="mr-2">📊</span> Yearly Statistics
                </h3>
            </div>

            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} />
                        <Bar
                            dataKey="commission"
                            name="Commission given"
                            fill="#7dd3fc" // Light Blue
                            radius={[4, 4, 0, 0]}
                            barSize={10}
                        />
                        <Bar
                            dataKey="earning"
                            name="Total earning"
                            fill="#0052cc" // Dark Blue
                            radius={[4, 4, 0, 0]}
                            barSize={10}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DashboardChart;
