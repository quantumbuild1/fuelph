export const formatPrice = (price) => {
  return `₱${parseFloat(price).toFixed(2)}`;
};

export const formatDate = (date) => {
  return new Date(date).toLocaleString('en-PH');
};

export const calculateFuelCost = (distance, efficiency, pricePerLiter) => {
  const fuelNeeded = distance / efficiency;
  return (fuelNeeded * pricePerLiter).toFixed(2);
};
