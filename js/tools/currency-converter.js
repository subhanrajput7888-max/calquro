// Currency Converter JavaScript
// Note: In a real implementation, you would use a live API like ExchangeRate-API

// Sample exchange rates (relative to USD)
const exchangeRates = {
    'USD': 1.0,
    'EUR': 0.92,
    'GBP': 0.79,
    'INR': 83.25,
    'JPY': 149.50,
    'AUD': 1.53,
    'CAD': 1.36,
    'CHF': 0.88,
    'CNY': 7.24,
    'SGD': 1.35
};

function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    
    if (!amount || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    
    // Convert to USD first, then to target currency
    const usdAmount = amount / exchangeRates[fromCurrency];
    const convertedAmount = usdAmount * exchangeRates[toCurrency];
    
    // Calculate exchange rate
    const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
    
    // Display results
    document.getElementById('convertedAmount').textContent = 
        formatCurrency(convertedAmount, toCurrency);
    
    document.getElementById('conversionRate').textContent = 
        `Exchange Rate: 1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
    
    document.getElementById('lastUpdated').textContent = 
        `Last updated: ${new Date().toLocaleString()}`;
    
    // Show results
    document.getElementById('conversionResult').style.display = 'block';
    
    // Smooth scroll to results
    document.getElementById('conversionResult').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
    });
}

function formatCurrency(amount, currencyCode) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

function swapCurrencies() {
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    
    document.getElementById('fromCurrency').value = toCurrency;
    document.getElementById('toCurrency').value = fromCurrency;
    
    // Auto-convert if amount is present
    const amount = document.getElementById('amount').value;
    if (amount) {
        convertCurrency();
    }
}

function setConversion(from, to) {
    document.getElementById('fromCurrency').value = from;
    document.getElementById('toCurrency').value = to;
    document.getElementById('amount').value = 1;
    convertCurrency();
}

// Add event listeners for real-time conversion
document.addEventListener('DOMContentLoaded', function() {
    const inputs = ['amount', 'fromCurrency', 'toCurrency'];
    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('change', function() {
                const amount = document.getElementById('amount').value;
                if (amount) {
                    convertCurrency();
                }
            });
        }
    });
    
    // Initial conversion
    convertCurrency();
});