document.addEventListener('DOMContentLoaded', () => {
    // Define emission factors (these are example values, you might want to find more specific ones)
    // Values are in kg CO2e per unit
    const EMISSION_FACTORS = {
        electricity: 0.233, // kg CO2e per kWh (example for average grid mix)
        carMile: 0.404,     // kg CO2e per mile (average car)
        flightHour: 150,    // kg CO2e per hour of flight (average, varies greatly)
        meatMeal: 2.5,      // kg CO2e per meat meal (simplified average)
        wasteKg: 0.5        // kg CO2e per kg of waste (simplified average for landfill)
    };

    // Get references to input fields and the result display
    const electricityInput = document.getElementById('electricity');
    const carMilesInput = document.getElementById('carMiles');
    const flightsInput = document.getElementById('flights');
    const meatConsumptionInput = document.getElementById('meatConsumption');
    const wasteInput = document.getElementById('waste');
    const resultDisplay = document.getElementById('result');

    // Function to calculate carbon footprint
    function calculateCarbonFootprint() {
        const electricity = parseFloat(electricityInput.value) || 0; // kWh/month
        const carMiles = parseFloat(carMilesInput.value) || 0;       // miles/year
        const flights = parseFloat(flightsInput.value) || 0;         // hours/year
        const meatConsumption = parseFloat(meatConsumptionInput.value) || 0; // meals/week
        const waste = parseFloat(wasteInput.value) || 0;             // kg/week

        // Convert monthly electricity to annual
        const annualElectricityCO2 = electricity * 12 * EMISSION_FACTORS.electricity;

        // Car miles already annual
        const annualCarCO2 = carMiles * EMISSION_FACTORS.carMile;

        // Flight hours already annual
        const annualFlightCO2 = flights * EMISSION_FACTORS.flightHour;

        // Convert weekly meat meals to annual
        const annualMeatCO2 = meatConsumption * 52 * EMISSION_FACTORS.meatMeal;

        // Convert weekly waste to annual
        const annualWasteCO2 = waste * 52 * EMISSION_FACTORS.wasteKg;

        const totalCarbonFootprint = annualElectricityCO2 + annualCarCO2 + annualFlightCO2 + annualMeatCO2 + annualWasteCO2;

        // Display the result
        // Use .toFixed(2) to round to two decimal places for cleaner display
        resultDisplay.textContent = `${totalCarbonFootprint.toFixed(2)} kg CO2e per year`;
    }

    // Add event listeners for real-time calculation
    // 'input' event fires whenever the value of an <input> or <textarea> element has been changed
    electricityInput.addEventListener('input', calculateCarbonFootprint);
    carMilesInput.addEventListener('input', calculateCarbonFootprint);
    flightsInput.addEventListener('input', calculateCarbonFootprint);
    meatConsumptionInput.addEventListener('input', calculateCarbonFootprint);
    wasteInput.addEventListener('input', calculateCarbonFootprint);

    // Initial calculation when the page loads
    calculateCarbonFootprint();
});
