import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { api } from '../services/api';

function PriceTrendChart({ stationId }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrend = async () => {
      try {
        const response = await api.get(`/fuel/trend?stationId=${stationId}&days=7`);
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching trend:', error);
      } finally {
        setLoading(false);
      }
    };

    if (stationId) fetchTrend();
  }, [stationId]);

  if (loading) return <div className="h-64 flex items-center justify-center">Loading chart...</div>;

  return (
    <section className="bg-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl text-yellow-300 mb-4 font-bold">📈 Price Trend (7 Days)</h2>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="date" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563' }} />
          <Line type="monotone" dataKey="price" stroke="#FBBF24" dot={{ fill: '#FBBF24' }} />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}

export default PriceTrendChart;
