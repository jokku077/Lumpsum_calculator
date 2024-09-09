// Import Chart.js only if needed
//import Chart from 'chart.js/auto';

var options = {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "INR"
};

function calc_returns() {
    let amount = parseFloat(document.getElementById('amount').value);
    let term = parseFloat(document.getElementById('term').value) * 12;
    let roi = parseFloat(document.getElementById('roi').value) / 100 / 12;

    if (isNaN(amount) || isNaN(term) || isNaN(roi) || amount <= 0 || term <= 0 || roi <= 0) {
        alert("Please enter valid values greater than 0.");
        return;
    }

    let total_investment = amount * term;
    
    // M = P × ({[1 + i]^n – 1} / i) × (1 + i)
    let maturity = amount * ((Math.pow(1 + roi, term) - 1) / roi) * (1 + roi);
    let returns = maturity - total_investment;

    var display_val = maturity.toLocaleString("en-IN", options);
    var display_tot = total_investment.toLocaleString("en-IN", options);
    var display_returns = returns.toLocaleString("en-IN", options);

    document.getElementById("total_investment").innerHTML = `Total Investment: ${display_tot}`;
    document.getElementById("total_returns").innerHTML = `Total Returns: ${display_returns}`;
    document.getElementById("total_value").innerHTML = `Total Value: ${display_val}`;

    // Chart.js logic
    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Investment', 'Returns'],
            datasets: [{
                label: 'Amount in INR',
                data: [total_investment, returns],
                backgroundColor: ['#3498db', '#2ecc71'],
                borderWidth: 1
            }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
