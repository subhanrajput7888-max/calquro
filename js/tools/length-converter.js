// Length Converter JavaScript
const lengthUnits = {
    'm': 1,           // meters (base unit)
    'cm': 0.01,       // centimeters
    'mm': 0.001,      // millimeters
    'km': 1000,       // kilometers
    'in': 0.0254,     // inches
    'ft': 0.3048,     // feet
    'yd': 0.9144,     // yards
    'mi': 1609.344    // miles
};

function convertLength() {
    const value = parseFloat(document.getElementById('lengthValue').value);
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    
    if (!value || value < 0) {
        alert('Please enter a valid positive value');
        return;
    }
    
    // Convert to meters first, then to target unit
    const meters = value * lengthUnits[fromUnit];
    const result = meters / lengthUnits[toUnit];
    
    document.getElementById('convertedValue').textContent = 
        `${result.toFixed(6)} ${getUnitName(toUnit)}`;
    
    document.getElementById('conversionFormula').textContent = 
        `1 ${getUnitName(fromUnit)} = ${(lengthUnits[fromUnit] / lengthUnits[toUnit]).toFixed(6)} ${getUnitName(toUnit)}`;
    
    document.getElementById('lengthResult').style.display = 'block';
}

function getUnitName(unit) {
    const names = {
        'm': 'meters', 'cm': 'centimeters', 'mm': 'millimeters', 'km': 'kilometers',
        'in': 'inches', 'ft': 'feet', 'yd': 'yards', 'mi': 'miles'
    };
    return names[unit] || unit;
}

function swapUnits() {
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    document.getElementById('fromUnit').value = toUnit;
    document.getElementById('toUnit').value = fromUnit;
    if (document.getElementById('lengthValue').value) convertLength();
}

document.addEventListener('DOMContentLoaded', function() {
    ['lengthValue', 'fromUnit', 'toUnit'].forEach(id => {
        document.getElementById(id)?.addEventListener('change', () => {
            if (document.getElementById('lengthValue').value) convertLength();
        });
    });
    convertLength();
});