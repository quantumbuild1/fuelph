import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { api } from '../services/api';
import '../styles/components.css';

function StationMap() {
  const [map, setMap] = useState(null);
  const [stations, setStations] = useState([]);

  useEffect(() => {
    // Initialize map
    const newMap = L.map('map').setView([14.5994, 120.9842], 11);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(newMap);

    setMap(newMap);

    return () => newMap.remove();
  }, []);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await api.get('/stations');
        setStations(response.data.data);

        // Add markers
        if (map) {
          response.data.data.forEach(station => {
            if (station.latitude && station.longitude) {
              L.marker([station.latitude, station.longitude])
                .addTo(map)
                .bindPopup(
                  `<b>${station.name}</b><br>
                   ${station.brand}<br>
                   ${station.city}<br>
                   <a href="#" class="text-yellow-400">View Prices</a>`
                );
            }
          });
        }
      } catch (error) {
        console.error('Error fetching stations:', error);
      }
    };

    if (map) fetchStations();
  }, [map]);

  return (
    <section className="bg-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl text-yellow-300 mb-4 font-bold">📍 Station Map</h2>
      <div id="map" className="h-96 rounded border border-gray-700"></div>
    </section>
  );
}

export default StationMap;
