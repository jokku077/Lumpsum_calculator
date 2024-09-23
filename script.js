// Import Chart.js only if needed
//import Chart from 'chart.js/auto';

var options = {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "INR"
};

let myChart;

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
    let return_percentage = (returns/total_investment) * 100;

    var display_val = maturity.toLocaleString("en-IN", options);
    var display_tot = total_investment.toLocaleString("en-IN", options);
    var display_returns = returns.toLocaleString("en-IN", options);

    document.getElementById("total_investment").innerHTML = `Total Investment: ${display_tot}`;
    document.getElementById("total_returns").innerHTML = `Total Returns: ${display_returns}`;
    document.getElementById("total_value").innerHTML = `Total Value: ${display_val}`;
    document.getElementById("percentage_returns").innerHTML = `Percentage of Returns: ${(return_percentage.toFixed(1))}%`;

    //call update chart
    updateChart(total_investment, returns);
}

function updateChart(investment, returns) {
  const ctx = document.getElementById('myChart').getContext('2d');

  // If the chart already exists, update its data
  if (myChart) {
      myChart.data.datasets[0].data = [investment, returns];
      myChart.update();
  } else {
      // If the chart does not exist, create it
      myChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
              labels: ['Investment', 'Returns'],
              datasets: [{
                  label: 'Amount in INR',
                  data: [investment, returns],
                  backgroundColor: ['#3498db', '#2ecc71'],
                  borderWidth: 1
              }]
          },
          /*options: {
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }*/
      });
  }
}
