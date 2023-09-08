import React from "react";
import { Line } from 'react-chartjs-2';  

function CumulativeCash({cumulativeCash}) {

    const data = {
        labels: Array.from({ length: 120 }, (_, i) => i + 1), // Months
        datasets: [
            {
                label: 'Cash Flows',
                data: cumulativeCash,
                fill: 'origin',  
                borderColor: 'rgba(89, 144, 77, 1)',
                backgroundColor: 'rgba(89, 144, 77, 0.2)',
                tension: 0.1
            }
        ]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value, index, values) {
                        return '$' + value.toLocaleString();
                    }
                }
            }
        }
    };

    return (
        <div>
            <h4>Cumulative Cash Flows</h4>
            <Line data={data} options={options} />
        </div>
    );
}

export default CumulativeCash;
