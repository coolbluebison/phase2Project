import React from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import * as math from 'mathjs' 


function EarningsGraph({graphEarnings}) {
  

    const monthlyFreeCashFlows = graphEarnings;

    const data = {
        labels: Array.from({ length: 120 }, (_, i) => i + 1), // Months
        datasets: [
        {
            label: 'Monthly Cash Flows',
            data: monthlyFreeCashFlows,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }
        ]
    };

    const options = {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              // Include a dollar sign and commas in the ticks
              callback: function(value, index, values) {
                return '$' + value.toLocaleString();
              },
            },
          },
        },
      };
      

    return (
        <div>
            <h4>Monthly Cash Flows</h4>
            <Bar data={data} options={options} />
        </div>
    );

}

export default EarningsGraph;


