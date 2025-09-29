// Student Calculator JavaScript
// Advanced scientific calculator functionality

let display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';
let shouldResetDisplay = false;

document.addEventListener('DOMContentLoaded', function() {
    display = document.getElementById('display');
    initializeCalculator();
});

function initializeCalculator() {
    updateDisplay('0');
}

function updateDisplay(value) {
    if (display) {
        display.textContent = value;
    }
}

function clearAll() {
    currentInput = '';
    operator = '';
    previousInput = '';
    shouldResetDisplay = false;
    updateDisplay('0');
}

function clearEntry() {
    currentInput = '';
    updateDisplay('0');
}

function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput);
    } else {
        currentInput = '';
        updateDisplay('0');
    }
}

function appendNumber(number) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    
    if (number === '.' && currentInput.includes('.')) return;
    
    currentInput += number;
    updateDisplay(currentInput);
}

function setOperation(op) {
    if (currentInput === '') return;
    
    if (previousInput !== '' && operator !== '') {
        calculate();
    }
    
    operator = op;
    previousInput = currentInput;
    shouldResetDisplay = true;
}

function calculate() {
    if (previousInput === '' || currentInput === '' || operator === '') return;
    
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;
    
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                updateDisplay('Error');
                return;
            }
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        case '^':
            result = Math.pow(prev, current);
            break;
        default:
            return;
    }
    
    currentInput = result.toString();
    operator = '';
    previousInput = '';
    shouldResetDisplay = true;
    updateDisplay(formatResult(result));
}

function calculateFunction(func) {
    if (currentInput === '') return;
    
    const current = parseFloat(currentInput);
    let result;
    
    switch (func) {
        case 'sqrt':
            if (current < 0) {
                updateDisplay('Error');
                return;
            }
            result = Math.sqrt(current);
            break;
        case 'square':
            result = current * current;
            break;
        case 'cube':
            result = current * current * current;
            break;
        case 'sin':
            result = Math.sin(toRadians(current));
            break;
        case 'cos':
            result = Math.cos(toRadians(current));
            break;
        case 'tan':
            result = Math.tan(toRadians(current));
            break;
        case 'log':
            if (current <= 0) {
                updateDisplay('Error');
                return;
            }
            result = Math.log10(current);
            break;
        case 'ln':
            if (current <= 0) {
                updateDisplay('Error');
                return;
            }
            result = Math.log(current);
            break;
        case 'factorial':
            if (current < 0 || !Number.isInteger(current)) {
                updateDisplay('Error');
                return;
            }
            result = factorial(current);
            break;
        case 'inverse':
            if (current === 0) {
                updateDisplay('Error');
                return;
            }
            result = 1 / current;
            break;
        case 'negate':
            result = -current;
            break;
        default:
            return;
    }
    
    currentInput = result.toString();
    shouldResetDisplay = true;
    updateDisplay(formatResult(result));
}

function insertConstant(constant) {
    let value;
    switch (constant) {
        case 'pi':
            value = Math.PI;
            break;
        case 'e':
            value = Math.E;
            break;
        default:
            return;
    }
    
    currentInput = value.toString();
    updateDisplay(formatResult(value));
    shouldResetDisplay = true;
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function factorial(n) {
    if (n === 0 || n === 1) return 1;
    if (n > 170) return Infinity; // Prevent overflow
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

function formatResult(result) {
    if (isNaN(result) || !isFinite(result)) {
        return 'Error';
    }
    
    // Round to avoid floating point errors
    const rounded = Math.round(result * 1e12) / 1e12;
    
    // Use scientific notation for very large or very small numbers
    if (Math.abs(rounded) > 1e15 || (Math.abs(rounded) < 1e-6 && rounded !== 0)) {
        return rounded.toExponential(6);
    }
    
    return rounded.toString();
}

// Memory functions
let memory = 0;

function memoryStore() {
    if (currentInput !== '') {
        memory = parseFloat(currentInput);
        showNotification('Value stored in memory');
    }
}

function memoryRecall() {
    currentInput = memory.toString();
    updateDisplay(formatResult(memory));
    shouldResetDisplay = true;
}

function memoryClear() {
    memory = 0;
    showNotification('Memory cleared');
}

function memoryAdd() {
    if (currentInput !== '') {
        memory += parseFloat(currentInput);
        showNotification('Value added to memory');
    }
}

function memorySubtract() {
    if (currentInput !== '') {
        memory -= parseFloat(currentInput);
        showNotification('Value subtracted from memory');
    }
}

function showNotification(message) {
    if (window.CalquroUtils && window.CalquroUtils.showNotification) {
        window.CalquroUtils.showNotification(message, 'info');
    }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '.') {
        appendNumber('.');
    } else if (key === '+') {
        setOperation('+');
    } else if (key === '-') {
        setOperation('-');
    } else if (key === '*') {
        setOperation('*');
    } else if (key === '/') {
        event.preventDefault();
        setOperation('/');
    } else if (key === '%') {
        setOperation('%');
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape') {
        clearAll();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});