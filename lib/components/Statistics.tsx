"use client"

import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Title,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import useStats from '../hooks/useStats';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Title
);

const Statistics = () => {
    const { stats } = useStats();
    const revenue = stats?.totalRevenue;

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Monthly Revenue',
                data: [revenue, , revenue / 2, revenue / 3, revenue / 4, revenue / 5, revenue / 6, revenue, revenue / 7, revenue / 8, revenue / 9, revenue / 10, revenue / 11, revenue / 12],
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.4,
                fill: false,
            },
        ],
    };


    return (
        <div>
            <div className='overflow-hidden p-12'>
                <Line data={data} />
            </div>
        </div>
    );
};

export default Statistics;