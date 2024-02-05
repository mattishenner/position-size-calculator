function calculatePositionSize() {
    var accountSize = document.getElementById('accountSize').value;
    var riskPercentage = document.getElementById('riskPercentage').value;
    var entryPrice = document.getElementById('entryPrice').value;
    var stopLossPrice = document.getElementById('stopLossPrice').value;
    var accountCurrency = document.getElementById('accountCurrency').value;
    var securityCurrency = document.getElementById('securityCurrency').value;

    // Save accountSize, riskPercentage, accountCurrency, and securityCurrency to localStorage
    localStorage.setItem('accountSize', accountSize);
    localStorage.setItem('riskPercentage', riskPercentage);
    localStorage.setItem('accountCurrency', accountCurrency);
    localStorage.setItem('securityCurrency', securityCurrency);

    fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_l1Z2TFDiA2lM6du8LxsE5Nny3aeLQyCpjBgiuGLd&currencies=${securityCurrency}&base_currency=${accountCurrency}`)
        .then(response => response.json())
        .then(data => {
            var conversionRate = data.data[securityCurrency];
            var riskAmount = accountSize * (riskPercentage / 100);
            var riskPerShare = Math.abs(entryPrice - stopLossPrice);
            var positionSize = (riskAmount / riskPerShare) * conversionRate;

            // Display the position size with two decimal places
            document.getElementById('result').innerHTML = "Your position size should be: <span>" + positionSize.toFixed(2) + "</span> shares.";
        })
        .catch(error => console.error('Error:', error));
}

// Load accountSize, riskPercentage, accountCurrency, and securityCurrency from localStorage when the page loads
window.onload = function() {
var accountSize = localStorage.getItem('accountSize');
var riskPercentage = localStorage.getItem('riskPercentage');
var accountCurrency = localStorage.getItem('accountCurrency');
var securityCurrency = localStorage.getItem('securityCurrency');

if(accountSize && riskPercentage && accountCurrency && securityCurrency) {
document.getElementById('accountSize').value = accountSize;
document.getElementById('riskPercentage').value = riskPercentage;
document.getElementById('accountCurrency').value = accountCurrency;
document.getElementById('securityCurrency').value = securityCurrency;
}
}





