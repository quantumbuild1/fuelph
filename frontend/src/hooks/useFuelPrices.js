import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useFuelPrices = (filters = {}) => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams(filters).toString();
        const response = await api.get(`/fuel/prices?${queryParams}`);
        setPrices(response.data.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching prices:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, [filters]);

  return { prices, loading, error };
};
