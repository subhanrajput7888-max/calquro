// Password Generator JavaScript
function generatePassword() {
    const length = parseInt(document.getElementById('passwordLength').value);
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeLowercase = document.getElementById('includeLowercase').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;
    
    let characters = '';
    if (includeUppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) characters += '0123456789';
    if (includeSymbols) characters += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (characters === '') {
        alert('Please select at least one character type');
        return;
    }
    
    let password = '';
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    document.getElementById('generatedPassword').value = password;
    calculatePasswordStrength(password);
}

function calculatePasswordStrength(password) {
    let score = 0;
    let strength = '';
    
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    if (score < 3) {
        strength = '<span style="color: #ef4444;">Weak</span>';
    } else if (score < 5) {
        strength = '<span style="color: #f59e0b;">Medium</span>';
    } else {
        strength = '<span style="color: #10b981;">Strong</span>';
    }
    
    document.getElementById('passwordStrength').innerHTML = `Password Strength: ${strength} (${score}/6)`;
}

function copyPassword() {
    const passwordField = document.getElementById('generatedPassword');
    passwordField.select();
    passwordField.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(passwordField.value).then(() => {
        alert('Password copied to clipboard!');
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('passwordLength').addEventListener('input', function() {
        document.getElementById('lengthValue').textContent = this.value;
        generatePassword();
    });
    
    ['includeUppercase', 'includeLowercase', 'includeNumbers', 'includeSymbols'].forEach(id => {
        document.getElementById(id).addEventListener('change', generatePassword);
    });
    
    generatePassword();
});