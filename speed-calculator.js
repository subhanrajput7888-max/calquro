// Speed Calculator JavaScript
function calculateSpeed() {
    const distance = parseFloat(document.getElementById('distance').value);
    const time = parseFloat(document.getElementById('time').value);
    const distanceUnit = document.getElementById('distanceUnit').value;
    const timeUnit = document.getElementById('timeUnit').value;
    
    if (!distance || !time || distance <= 0 || time <= 0) {
        alert('Please enter valid distance and time values');
        return;
    }
    
    // Convert to standard units (km/h)
    let distanceInKm = convertDistance(distance, distanceUnit, 'km');
    let timeInHours = convertTime(time, timeUnit, 'h');
    
    const speed = distanceInKm / timeInHours;
    
    document.getElementById('speedResult').innerHTML = `
        <h3>Speed Calculation Result</h3>
        <p><strong>Speed:</strong> ${speed.toFixed(2)} km/h</p>
        <p><strong>Speed:</strong> ${(speed * 0.621371).toFixed(2)} mph</p>
        <p><strong>Speed:</strong> ${(speed * 0.277778).toFixed(2)} m/s</p>
    `;
    document.getElementById('speedResult').style.display = 'block';
}

function calculateDistance() {
    const speed = parseFloat(document.getElementById('speed').value);
    const time = parseFloat(document.getElementById('time').value);
    const speedUnit = document.getElementById('speedUnit').value;
    const timeUnit = document.getElementById('timeUnit').value;
    
    if (!speed || !time || speed <= 0 || time <= 0) {
        alert('Please enter valid speed and time values');
        return;
    }
    
    let speedInKmh = convertSpeed(speed, speedUnit, 'kmh');
    let timeInHours = convertTime(time, timeUnit, 'h');
    
    const distance = speedInKmh * timeInHours;
    
    document.getElementById('speedResult').innerHTML = `
        <h3>Distance Calculation Result</h3>
        <p><strong>Distance:</strong> ${distance.toFixed(2)} km</p>
        <p><strong>Distance:</strong> ${(distance * 0.621371).toFixed(2)} miles</p>
        <p><strong>Distance:</strong> ${(distance * 1000).toFixed(0)} meters</p>
    `;
    document.getElementById('speedResult').style.display = 'block';
}

function calculateTime() {
    const distance = parseFloat(document.getElementById('distance').value);
    const speed = parseFloat(document.getElementById('speed').value);
    const distanceUnit = document.getElementById('distanceUnit').value;
    const speedUnit = document.getElementById('speedUnit').value;
    
    if (!distance || !speed || distance <= 0 || speed <= 0) {
        alert('Please enter valid distance and speed values');
        return;
    }
    
    let distanceInKm = convertDistance(distance, distanceUnit, 'km');
    let speedInKmh = convertSpeed(speed, speedUnit, 'kmh');
    
    const timeInHours = distanceInKm / speedInKmh;
    const timeInMinutes = timeInHours * 60;
    const timeInSeconds = timeInMinutes * 60;
    
    document.getElementById('speedResult').innerHTML = `
        <h3>Time Calculation Result</h3>
        <p><strong>Time:</strong> ${timeInHours.toFixed(2)} hours</p>
        <p><strong>Time:</strong> ${timeInMinutes.toFixed(0)} minutes</p>
        <p><strong>Time:</strong> ${timeInSeconds.toFixed(0)} seconds</p>
    `;
    document.getElementById('speedResult').style.display = 'block';
}

function convertDistance(value, from, to) {
    const factors = { km: 1, m: 0.001, mi: 1.60934, ft: 0.0003048 };
    return value * factors[from] / factors[to];
}

function convertTime(value, from, to) {
    const factors = { h: 1, min: 1/60, s: 1/3600 };
    return value * factors[from] / factors[to];
}

function convertSpeed(value, from, to) {
    const factors = { kmh: 1, mph: 1.60934, ms: 3.6, fps: 1.09728 };
    return value * factors[from] / factors[to];
}