import React from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import * as math from 'mathjs' 



function ProductionGraph({oilProductionCurve, gasProductionCurve}) {
  
    const dailyOil = math.multiply(oilProductionCurve, 1/30)
    const dailyGas = math.multiply(gasProductionCurve, 1/30)
   
    const data = {
        labels: Array.from({ length: 120 }, (_, i) => i + 1), // Months
        datasets: [
          {
            label: 'Oil Production (Bopd)',
            data: dailyOil, // curve 1
            borderColor: 'olive',
            fill: false,
          },
          {
            label: 'Gas Production (Mcfpd)',
            data: dailyGas, //  curve 2
            borderColor: 'red',
            fill: false,
          },
        ],
      };
    
      const options = {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Months',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Production Rate',
            },
          },
        },
      };
    
      return (
        <div>
          <h4>Production Curves</h4>
          <Line data={data} options={options} />
        </div>
      );
}

export default ProductionGraph;


