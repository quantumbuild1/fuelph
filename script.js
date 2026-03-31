// script.js

// Fuel Cost Calculator
function calculateFuelCost(pricePerUnit, distance, fuelEfficiency) {
    const fuelNeeded = distance / fuelEfficiency; // in gallons/liters
    const totalCost = fuelNeeded * pricePerUnit; 
    return totalCost.toFixed(2);
}

// Price Trend Chart Visualization using Chart.js
function renderPriceTrendChart(prices, labels) {
    const ctx = document.getElementById('priceTrendChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Fuel Price Trend',
                data: prices,
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Form Submission Handling
function handleFormSubmission(event) {
    event.preventDefault();
    const pricePerUnit = parseFloat(document.getElementById('pricePerUnit').value);
    const distance = parseFloat(document.getElementById('distance').value);
    const fuelEfficiency = parseFloat(document.getElementById('fuelEfficiency').value);
    
    const cost = calculateFuelCost(pricePerUnit, distance, fuelEfficiency);
    alert(`Total Fuel Cost: $${cost}`);
}

// Login/Authentication UI
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Placeholder for authentication logic
    if (username && password) {
        alert('Login successful!');
    } else {
        alert('Please enter valid credentials.');
    }
}

// Event Listeners
document.getElementById('fuelCostForm').addEventListener('submit', handleFormSubmission);
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    login();
});