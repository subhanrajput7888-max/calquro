// Percentage Calculator JavaScript

function calculatePercentOf() {
    const percent = parseFloat(document.getElementById('percent1').value);
    const number = parseFloat(document.getElementById('number1').value);
    
    if (isNaN(percent) || isNaN(number)) {
        document.getElementById('result1').textContent = 'Please enter valid numbers';
        return;
    }
    
    const result = (percent / 100) * number;
    document.getElementById('result1').textContent = `${percent}% of ${number} = ${result.toFixed(2)}`;
}

function calculatePercentChange() {
    const oldValue = parseFloat(document.getElementById('oldValue').value);
    const newValue = parseFloat(document.getElementById('newValue').value);
    
    if (isNaN(oldValue) || isNaN(newValue)) {
        document.getElementById('result2').textContent = 'Please enter valid numbers';
        return;
    }
    
    if (oldValue === 0) {
        document.getElementById('result2').textContent = 'Cannot calculate percentage change from zero';
        return;
    }
    
    const change = newValue - oldValue;
    const percentChange = (change / oldValue) * 100;
    const changeType = change >= 0 ? 'increase' : 'decrease';
    
    document.getElementById('result2').textContent = 
        `${Math.abs(percentChange).toFixed(2)}% ${changeType} (${change > 0 ? '+' : ''}${change.toFixed(2)})`;
}

function calculateWhatPercent() {
    const part = parseFloat(document.getElementById('part').value);
    const whole = parseFloat(document.getElementById('whole').value);
    
    if (isNaN(part) || isNaN(whole)) {
        document.getElementById('result3').textContent = 'Please enter valid numbers';
        return;
    }
    
    if (whole === 0) {
        document.getElementById('result3').textContent = 'Cannot divide by zero';
        return;
    }
    
    const percentage = (part / whole) * 100;
    document.getElementById('result3').textContent = `${part} is ${percentage.toFixed(2)}% of ${whole}`;
}

function percentToDecimal() {
    const percent = parseFloat(document.getElementById('percentToDecimal').value);
    
    if (isNaN(percent)) {
        document.getElementById('result4').textContent = 'Please enter a valid percentage';
        return;
    }
    
    const decimal = percent / 100;
    document.getElementById('result4').textContent = `${percent}% = ${decimal.toFixed(4)}`;
}

function decimalToPercent() {
    const decimal = parseFloat(document.getElementById('decimalToPercent').value);
    
    if (isNaN(decimal)) {
        document.getElementById('result5').textContent = 'Please enter a valid decimal';
        return;
    }
    
    const percentage = decimal * 100;
    document.getElementById('result5').textContent = `${decimal} = ${percentage.toFixed(2)}%`;
}

function calculatePercentError() {
    const actual = parseFloat(document.getElementById('actualValue').value);
    const measured = parseFloat(document.getElementById('measuredValue').value);
    
    if (isNaN(actual) || isNaN(measured)) {
        document.getElementById('result6').textContent = 'Please enter valid numbers';
        return;
    }
    
    if (actual === 0) {
        document.getElementById('result6').textContent = 'Actual value cannot be zero';
        return;
    }
    
    const error = Math.abs(actual - measured);
    const percentError = (error / Math.abs(actual)) * 100;
    
    document.getElementById('result6').textContent = `Percentage Error = ${percentError.toFixed(2)}%`;
}

// Add event listeners for real-time calculation
document.addEventListener('DOMContentLoaded', function() {
    // Auto-calculate when inputs change
    const calculators = [
        { inputs: ['percent1', 'number1'], func: calculatePercentOf },
        { inputs: ['oldValue', 'newValue'], func: calculatePercentChange },
        { inputs: ['part', 'whole'], func: calculateWhatPercent },
        { inputs: ['percentToDecimal'], func: percentToDecimal },
        { inputs: ['decimalToPercent'], func: decimalToPercent },
        { inputs: ['actualValue', 'measuredValue'], func: calculatePercentError }
    ];
    
    calculators.forEach(calc => {
        calc.inputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input) {
                input.addEventListener('input', () => {
                    const allFilled = calc.inputs.every(id => {
                        const el = document.getElementById(id);
                        return el && el.value.trim() !== '';
                    });
                    if (allFilled) {
                        calc.func();
                    }
                });
            }
        });
    });
    
    // Initial calculations
    calculatePercentOf();
    calculatePercentChange();
    calculateWhatPercent();
    percentToDecimal();
    decimalToPercent();
    calculatePercentError();
});