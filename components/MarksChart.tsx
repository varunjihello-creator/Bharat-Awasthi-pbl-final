import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Subject } from '../types';

interface MarksChartProps {
    subjects: Subject[];
}

const MarksChart: React.FC<MarksChartProps> = ({ subjects }) => {

    if (subjects.length === 0) {
        return <div className="flex items-center justify-center h-full text-slate-400">No subject marks added yet.</div>
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={subjects}
                margin={{
                    top: 5,
                    right: 20,
                    left: -10,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="marks" fill="#4f46e5" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default MarksChart;
