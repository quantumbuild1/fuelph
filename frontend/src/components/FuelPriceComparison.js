import React, { useEffect, useState } from 'react';
import { useFuelPrices } from '../hooks/useFuelPrices';
import { formatPrice, formatDate } from '../utils/formatter';

function FuelPriceComparison() {
  const { prices, loading, error } = useFuelPrices();
  const [filter, setFilter] = useState({
    city: 'All',
    fuelType: 'All',
  });

  if (loading) return <div className="text-center py-8">Loading prices...</div>;
  if (error) return <div className="text-red-500 py-8">Error: {error}</div>;

  const filteredPrices = prices.filter(p => 
    (filter.city === 'All' || p.Station?.city === filter.city) &&
    (filter.fuelType === 'All' || p.fuelType === filter.fuelType)
  );

  return (
    <section className="bg-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl text-yellow-300 mb-4 font-bold">📊 Fuel Price Comparison</h2>
      
      <div className="flex gap-4 mb-6">
        <select 
          value={filter.city} 
          onChange={(e) => setFilter({...filter, city: e.target.value})}
          className="p-2 rounded bg-gray-800 text-white border border-gray-600"
        >
          <option>All Cities</option>
          <option>Manila</option>
          <option>Quezon City</option>
        </select>

        <select 
          value={filter.fuelType} 
          onChange={(e) => setFilter({...filter, fuelType: e.target.value})}
          className="p-2 rounded bg-gray-800 text-white border border-gray-600"
        >
          <option>All Fuels</option>
          <option>Unleaded</option>
          <option>Diesel</option>
          <option>Premium</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-800 text-yellow-400">
            <tr>
              <th className="p-3 text-left">Station</th>
              <th className="p-3 text-center">Brand</th>
              <th className="p-3 text-center">City</th>
              <th className="p-3 text-center">Fuel Type</th>
              <th className="p-3 text-center">Price (₱)</th>
              <th className="p-3 text-center">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {filteredPrices.map((price, idx) => (
              <tr key={idx} className="border-b border-gray-700 hover:bg-gray-800 transition">
                <td className="p-3">{price.Station?.name}</td>
                <td className="p-3 text-center">{price.Station?.brand}</td>
                <td className="p-3 text-center">{price.Station?.city}</td>
                <td className="p-3 text-center">{price.fuelType}</td>
                <td className="p-3 text-center font-bold text-green-400">{formatPrice(price.price)}</td>
                <td className="p-3 text-center text-gray-400 text-xs">{formatDate(price.lastUpdated)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default FuelPriceComparison;
