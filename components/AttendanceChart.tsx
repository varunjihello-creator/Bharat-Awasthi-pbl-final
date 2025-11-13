import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AttendanceRecord } from '../types';

interface AttendanceChartProps {
    attendance: AttendanceRecord[];
}

const AttendanceChart: React.FC<AttendanceChartProps> = ({ attendance }) => {
    const presentCount = attendance.filter(a => a.status === 'present').length;
    const absentCount = attendance.filter(a => a.status === 'absent').length;

    const data = [
        { name: 'Present', value: presentCount },
        { name: 'Absent', value: absentCount },
    ];

    const COLORS = ['#10b981', '#ef4444'];
    
    if (attendance.length === 0) {
        return <div className="flex items-center justify-center h-full text-slate-400">No attendance data yet.</div>
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default AttendanceChart;
