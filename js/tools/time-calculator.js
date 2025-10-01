// Time Calculator JavaScript
function addTime() {
    const hours1 = parseInt(document.getElementById('hours1').value) || 0;
    const minutes1 = parseInt(document.getElementById('minutes1').value) || 0;
    const hours2 = parseInt(document.getElementById('hours2').value) || 0;
    const minutes2 = parseInt(document.getElementById('minutes2').value) || 0;
    
    let totalMinutes = minutes1 + minutes2;
    let totalHours = hours1 + hours2;
    
    if (totalMinutes >= 60) {
        totalHours += Math.floor(totalMinutes / 60);
        totalMinutes = totalMinutes % 60;
    }
    
    document.getElementById('timeResult').innerHTML = `
        <h3>Result: ${totalHours} hours and ${totalMinutes} minutes</h3>
        <p>Total minutes: ${(hours1 + hours2) * 60 + minutes1 + minutes2}</p>
        <p>Decimal hours: ${((hours1 + hours2) * 60 + minutes1 + minutes2) / 60}</p>
    `;
    document.getElementById('timeResult').style.display = 'block';
}

function subtractTime() {
    const hours1 = parseInt(document.getElementById('hours1').value) || 0;
    const minutes1 = parseInt(document.getElementById('minutes1').value) || 0;
    const hours2 = parseInt(document.getElementById('hours2').value) || 0;
    const minutes2 = parseInt(document.getElementById('minutes2').value) || 0;
    
    let totalMinutes1 = hours1 * 60 + minutes1;
    let totalMinutes2 = hours2 * 60 + minutes2;
    let diffMinutes = totalMinutes1 - totalMinutes2;
    
    if (diffMinutes < 0) {
        diffMinutes = Math.abs(diffMinutes);
    }
    
    const resultHours = Math.floor(diffMinutes / 60);
    const resultMinutes = diffMinutes % 60;
    
    document.getElementById('timeResult').innerHTML = `
        <h3>Result: ${resultHours} hours and ${resultMinutes} minutes</h3>
        <p>Total minutes: ${diffMinutes}</p>
        <p>Decimal hours: ${(diffMinutes / 60).toFixed(2)}</p>
    `;
    document.getElementById('timeResult').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function() {
    ['hours1', 'minutes1', 'hours2', 'minutes2'].forEach(id => {
        document.getElementById(id)?.addEventListener('change', addTime);
    });
    addTime();
});