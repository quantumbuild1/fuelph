import React, { useState } from 'react';
import { calculateFuelCost } from '../utils/formatter';

function FuelCalculator() {
  const [inputs, setInputs] = useState({
    distance: '',
    fuelEfficiency: '',
    pricePerLiter: '',
  });
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    const { distance, fuelEfficiency, pricePerLiter } = inputs;

    if (!distance || !fuelEfficiency || !pricePerLiter) {
      alert('Please fill in all fields');
      return;
    }

    const cost = calculateFuelCost(
      parseFloat(distance),
      parseFloat(fuelEfficiency),
      parseFloat(pricePerLiter)
    );

    setResult(cost);
  };

  return (
    <section className="bg-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl text-yellow-300 mb-4 font-bold">🧮 Fuel Cost Calculator</h2>
      
      <form onSubmit={handleCalculate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Distance (km)"
          value={inputs.distance}
          onChange={(e) => setInputs({...inputs, distance: e.target.value})}
          className="p-3 rounded bg-gray-800 text-white border border-gray-600 focus:border-yellow-400 outline-none"
        />
        
        <input
          type="number"
          placeholder="Fuel Efficiency (km/l)"
          value={inputs.fuelEfficiency}
          onChange={(e) => setInputs({...inputs, fuelEfficiency: e.target.value})}
          className="p-3 rounded bg-gray-800 text-white border border-gray-600 focus:border-yellow-400 outline-none"
        />

        <input
          type="number"
          placeholder="Price per Liter (₱)"
          value={inputs.pricePerLiter}
          onChange={(e) => setInputs({...inputs, pricePerLiter: e.target.value})}
          className="p-3 rounded bg-gray-800 text-white border border-gray-600 focus:border-yellow-400 outline-none"
        />

        <button
          type="submit"
          className="md:col-span-2 bg-yellow-400 text-black py-3 px-4 rounded font-semibold hover:bg-yellow-300 transition"
        >
          Calculate Fuel Cost
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-green-900 rounded border border-green-500">
          <p className="text-lg text-green-300 font-bold">
            Estimated Fuel Cost: <span className="text-2xl text-green-400">₱{result}</span>
          </p>
        </div>
      )}
    </section>
  );
}

export default FuelCalculator;
