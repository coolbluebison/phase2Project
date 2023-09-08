import React from 'react'
// import "/src/FinancialSummary.css"



function FinancialSummary( { npv, roundedROI, sumAllNetRevenue, netOilPrice, netGasPrice }) {


  let newNpv = (npv/1000000).toFixed(2)

  let newROI = (roundedROI * 100).toFixed(2)

  let newNetRevenues = (sumAllNetRevenue/1000000).toFixed(2)
    
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>

      <br></br >
      <h2>Single  Well Financial Summary</h2>
      
      <table style={{ margin: 'auto', borderCollapse: 'collapse', width: '60%', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid black' }}>
            <th style={{ padding: '10px' }}>Metric</th>
            <th style={{ padding: '10px' }}>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '10px' }}>Net Present Value - NPV10</td>
            <td style={{ padding: '10px' }}>{`$ ${newNpv} MM`}</td>
          </tr>
          <tr>
            <td style={{ padding: '10px' }}>Return on Investment - ROI</td>
            <td style={{ padding: '10px' }}>{`${newROI} %`}</td>
          </tr>
          <tr>
            <td style={{ padding: '10px' }}>Total Revenue</td>
            <td style={{ padding: '10px' }}>{`$ ${newNetRevenues} MM`}</td>
          </tr>
          <tr>
            <td style={{ padding: '10px' }}>Realized Oil Price ($/bbl)</td>
            <td style={{ padding: '10px' }}>{`$ ${netOilPrice.toFixed(2)}`}</td>
          </tr>
          <tr>
            <td style={{ padding: '10px' }}>Realized Gas Price ($/Mcf)</td>
            <td style={{ padding: '10px' }}>{`$ ${netGasPrice.toFixed(2)}`}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}



export default FinancialSummary;