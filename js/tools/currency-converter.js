// Currency Converter JavaScript with Live Exchange Rates
// Using ExchangeRate-API for real-time currency data

// Global variables for exchange rates
let exchangeRates = {
    // Fallback rates in case API fails
    'USD': 1.0,
    'EUR': 0.92,
    'GBP': 0.79,
    'INR': 83.25,
    'PKR': 278.50,
    'JPY': 149.50,
    'AUD': 1.53,
    'CAD': 1.36,
    'CHF': 0.88,
    'CNY': 7.24,
    'SGD': 1.35
};

let lastUpdated = new Date();
let isLoadingRates = false;

// Fetch live exchange rates from API
async function fetchExchangeRates() {
    if (isLoadingRates) return;
    
    isLoadingRates = true;
    
    try {
        // Show loading indicator
        showLoadingIndicator();
        
        // Using exchangerate-api.com (free tier: 1500 requests/month)
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && data.rates) {
            // Update exchange rates with live data
            exchangeRates = {
                'USD': 1.0,
                'EUR': data.rates.EUR || 0.92,
                'GBP': data.rates.GBP || 0.79,
                'INR': data.rates.INR || 83.25,
                'PKR': data.rates.PKR || 278.50,
                'JPY': data.rates.JPY || 149.50,
                'AUD': data.rates.AUD || 1.53,
                'CAD': data.rates.CAD || 1.36,
                'CHF': data.rates.CHF || 0.88,
                'CNY': data.rates.CNY || 7.24,
                'SGD': data.rates.SGD || 1.35
            };
            
            lastUpdated = new Date(data.time_last_updated || Date.now());
            
            // Update popular conversions with live rates
            updatePopularConversions();
            
            console.log('✅ Currency rates updated successfully');
            showSuccessMessage('Currency rates updated with live data!');
        }
        
    } catch (error) {
        console.warn('⚠️ Failed to fetch live rates, using cached rates:', error.message);
        showWarningMessage('Using cached rates - live data unavailable');
        
        // Fallback: try alternative API
        await tryAlternativeAPI();
    } finally {
        isLoadingRates = false;
        hideLoadingIndicator();
    }
}

// Try alternative free API as backup
async function tryAlternativeAPI() {
    try {
        // Using fixer.io free tier as backup
        const response = await fetch('https://api.fixer.io/latest?access_key=YOUR_API_KEY&base=USD');
        
        if (response.ok) {
            const data = await response.json();
            if (data && data.rates) {
                // Update rates from backup API
                Object.keys(exchangeRates).forEach(currency => {
                    if (data.rates[currency]) {
                        exchangeRates[currency] = currency === 'USD' ? 1.0 : data.rates[currency];
                    }
                });
                lastUpdated = new Date();
                console.log('✅ Backup API rates loaded');
            }
        }
    } catch (error) {
        console.log('Backup API also failed, using fallback rates');
    }
}

// Update popular conversions section with current rates
function updatePopularConversions() {
    const usdToPkr = document.querySelector('[onclick="setConversion(\'USD\', \'PKR\')"] div');
    const usdToInr = document.querySelector('[onclick="setConversion(\'USD\', \'INR\')"] div');
    const pkrToUsd = document.querySelector('[onclick="setConversion(\'PKR\', \'USD\')"] div');
    
    if (usdToPkr) usdToPkr.textContent = `1 USD = ${exchangeRates.PKR.toFixed(2)} PKR`;
    if (usdToInr) usdToInr.textContent = `1 USD = ${exchangeRates.INR.toFixed(2)} INR`;
    if (pkrToUsd) pkrToUsd.textContent = `100 PKR = ${(100 / exchangeRates.PKR).toFixed(2)} USD`;
}

// UI feedback functions
function showLoadingIndicator() {
    const indicator = document.getElementById('loading-indicator');
    if (indicator) {
        indicator.style.display = 'block';
        indicator.textContent = '🔄 Updating exchange rates...';
    }
}

function hideLoadingIndicator() {
    const indicator = document.getElementById('loading-indicator');
    if (indicator) {
        indicator.style.display = 'none';
    }
}

function showSuccessMessage(message) {
    showNotification(message, 'success');
}

function showWarningMessage(message) {
    showNotification(message, 'warning');
}

function showNotification(message, type = 'info') {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('currency-notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'currency-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 500;
            z-index: 1000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        document.body.appendChild(notification);
    }
    
    // Set notification style based on type
    const styles = {
        success: 'background: #10b981; color: white;',
        warning: 'background: #f59e0b; color: white;',
        error: 'background: #ef4444; color: white;',
        info: 'background: #3b82f6; color: white;'
    };
    
    notification.style.cssText += styles[type] || styles.info;
    notification.textContent = message;
    
    // Show notification
    notification.style.transform = 'translateX(0)';
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
    }, 3000);
}

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
        `Last updated: ${lastUpdated.toLocaleString()} (Live rates)`;
    
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

// Manual refresh function for users
function refreshExchangeRates() {
    fetchExchangeRates().then(() => {
        const amount = document.getElementById('amount').value;
        if (amount) {
            convertCurrency();
        }
    });
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
    
    // Fetch live exchange rates on page load
    fetchExchangeRates();
    
    // Initial conversion after rates are loaded
    setTimeout(() => {
        convertCurrency();
    }, 1000);
    
    // Update rates every 30 minutes
    setInterval(fetchExchangeRates, 30 * 60 * 1000);
});