import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import API from '../services/api';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function AnalyticsChart() {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const res = await API.get('/feedback');
            const courses = {};
            res.data.forEach(f => {
                const name = f.course.name;
                if (!courses[name]) courses[name] = [];
                courses[name].push(f.rating);
            });

            setChartData({
                labels: Object.keys(courses),
                datasets: [
                    {
                        label: 'Average Rating',
                        data: Object.values(courses).map(ratings => (ratings.reduce((a,b)=>a+b,0)/ratings.length).toFixed(2)),
                        backgroundColor: 'rgba(54, 162, 235, 0.6)'
                    }
                ]
            });
        };
        fetchData();
    }, []);

    return <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />;
}

export default AnalyticsChart;
