// EMI Calculator JavaScript
// Calculate Equated Monthly Installments

function calculateEMI() {
    // Get input values
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const annualRate = parseFloat(document.getElementById('interestRate').value);
    const tenure = parseFloat(document.getElementById('loanTenure').value);
    
    // Validate inputs
    if (!loanAmount || loanAmount <= 0) {
        alert('Please enter a valid loan amount');
        return;
    }
    
    if (!annualRate || annualRate <= 0) {
        alert('Please enter a valid interest rate');
        return;
    }
    
    if (!tenure || tenure <= 0) {
        alert('Please enter a valid loan tenure');
        return;
    }
    
    // Calculate EMI
    const monthlyRate = annualRate / 12 / 100; // Convert annual rate to monthly decimal
    const numberOfPayments = tenure * 12; // Convert years to months
    
    // EMI Formula: [P × R × (1+R)^N] / [(1+R)^N - 1]
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalAmount = emi * numberOfPayments;
    const totalInterest = totalAmount - loanAmount;
    
    // Display results
    document.getElementById('monthlyEMI').textContent = '₹' + formatNumber(emi.toFixed(2));
    document.getElementById('totalAmount').textContent = '₹' + formatNumber(totalAmount.toFixed(2));
    document.getElementById('totalInterest').textContent = '₹' + formatNumber(totalInterest.toFixed(2));
    document.getElementById('principalAmount').textContent = '₹' + formatNumber(loanAmount.toFixed(2));
    
    // Show results
    document.getElementById('emiResults').style.display = 'block';
    
    // Smooth scroll to results
    document.getElementById('emiResults').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
    });
}

function formatNumber(num) {
    return parseFloat(num).toLocaleString('en-IN');
}

// Add event listeners for real-time calculation
document.addEventListener('DOMContentLoaded', function() {
    const inputs = ['loanAmount', 'interestRate', 'loanTenure'];
    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', function() {
                // Auto-calculate if all fields have values
                const loanAmount = document.getElementById('loanAmount').value;
                const interestRate = document.getElementById('interestRate').value;
                const loanTenure = document.getElementById('loanTenure').value;
                
                if (loanAmount && interestRate && loanTenure) {
                    calculateEMI();
                }
            });
        }
    });
});