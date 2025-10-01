// Area Converter JavaScript
const areaUnits = {
    'sqm': 1,              // square meters (base)
    'sqkm': 1000000,       // square kilometers
    'sqft': 0.092903,      // square feet
    'sqin': 0.00064516,    // square inches
    'acre': 4046.86,       // acres
    'hectare': 10000       // hectares
};

function convertArea() {
    const value = parseFloat(document.getElementById('areaValue').value);
    const fromUnit = document.getElementById('fromAreaUnit').value;
    const toUnit = document.getElementById('toAreaUnit').value;
    
    if (!value || value < 0) {
        alert('Please enter a valid positive value');
        return;
    }
    
    const sqMeters = value * areaUnits[fromUnit];
    const result = sqMeters / areaUnits[toUnit];
    
    document.getElementById('convertedAreaValue').textContent = 
        `${result.toFixed(6)} ${getAreaUnitName(toUnit)}`;
    
    document.getElementById('areaResult').style.display = 'block';
}

function getAreaUnitName(unit) {
    const names = {
        'sqm': 'sq meters', 'sqkm': 'sq kilometers', 'sqft': 'sq feet', 
        'sqin': 'sq inches', 'acre': 'acres', 'hectare': 'hectares'
    };
    return names[unit] || unit;
}

function swapAreaUnits() {
    const from = document.getElementById('fromAreaUnit').value;
    const to = document.getElementById('toAreaUnit').value;
    document.getElementById('fromAreaUnit').value = to;
    document.getElementById('toAreaUnit').value = from;
    if (document.getElementById('areaValue').value) convertArea();
}

document.addEventListener('DOMContentLoaded', function() {
    ['areaValue', 'fromAreaUnit', 'toAreaUnit'].forEach(id => {
        document.getElementById(id)?.addEventListener('change', () => {
            if (document.getElementById('areaValue').value) convertArea();
        });
    });
    convertArea();
});