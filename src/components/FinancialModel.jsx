import React, { useEffect, useState }  from "react"
import FinancialSummary from "./FinancialSummary"
import Dashboards from "./Dashboards"
import * as math from 'mathjs' 



function FinancialModel() {

    const [data, setData] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/formData/1")
        .then((response) => response.json())
        .then((file) => setData(file))
        }, [])


    // Creating an oil production curve

    let initialRateOil = parseFloat(data["Initial-Production-Rate-Oil"])*30
    let oilDeclineRate = parseFloat(data["Monthly-Oil-Production-Decline-Rate"])*0.01 

    let numOfMonths = 120

    let oilProductionCurve = []
    
    let currentOilRate = initialRateOil
    
    for (let i=1; i<=numOfMonths; i++) {
        
        oilProductionCurve.push(currentOilRate)

        currentOilRate = currentOilRate * (1-oilDeclineRate)
    }

    // Creating a natural gas production curve

    let initialRateGas = parseFloat(data["Initial-Production-Rate-Gas"])*30
    let gasDeclineRate = parseFloat(data["Monthly-Gas-Production-Decline-Rate"]) * 0.01

    let gasProductionCurve = []

    let currentGasRate = initialRateGas

    for (let i=1; i<=numOfMonths; i++) {
        
        gasProductionCurve.push(currentGasRate)

        currentGasRate = currentGasRate * (1-oilDeclineRate)
    }


    // Assing all remaining variables

    let nriBeforePayout = parseFloat(data["NRI-Before-Payout"])*0.01
    let wiBeforePayout = parseFloat(data["WI-Before-Payout"])*0.01

    // Integrating the below components is a stretch goal
    // "NRI-After-Payout": "82.5",
    // "WI-After-Payout": "100",
    
    let nymexOilPricingDeduct = parseFloat(data["NYMEX-Oil-Pricing-Deduct"])
    let oilTransportationCost = parseFloat(data["Oil-Transportation-Cost"])
    let oilProcessingCost = parseFloat(data["Oil-Processing-Cost"])

    let hhubGasPricingDeduct = parseFloat(data["Hhub-Gas-Pricing-Deduct"])
    let gasTransportationCost= parseFloat(data["Gas-Transportation-Cost"])
    let gasProcessingCost = parseFloat(data["Gas-Processing-Cost"])

    let severanceTax = parseFloat(data["Severance-Tax"]) * 0.01
    let adValoremTax = parseFloat(data["Ad-Valorem-Tax"]) * 0.01

    let monthlyWellOperationCost = parseFloat(data["Monthly-Well-Operation-Cost"])

    let drillingCosts = parseFloat(data["Drilling-Costs"])
    let completionCosts = parseFloat(data["Completion-Costs"])
    let facilitiesCosts = parseFloat(data["Facilities-Costs"])
    let pipelineCosts = parseFloat(data["Pipeline-Costs"])
    let contingencyCosts = parseFloat(data["Contingency-Costs"])

    let avgOilPrice = parseFloat(data["Avg-Oil-Price-During-Period"])
    let avgGasPrice = parseFloat(data["Avg-Gas-Price-During-Period"])


    let netOilVolume = math.multiply(oilProductionCurve, nriBeforePayout, wiBeforePayout) 
    let netGasVolume = math.multiply(gasProductionCurve, nriBeforePayout, wiBeforePayout)

    // console.log("oilCurve", oilProductionCurve)

    // console.log(netOilVolume)


    // Calculating revenues
    let allOilDeduct = nymexOilPricingDeduct + oilTransportationCost + oilProcessingCost
    let netOilPrice = avgOilPrice - allOilDeduct

    let netOilRevenue = math.multiply(netOilVolume, netOilPrice )

    let allGasDeduct = hhubGasPricingDeduct + gasTransportationCost + gasProcessingCost
    let netGasPrice = avgGasPrice - allGasDeduct

    let netGasRevenue = math.multiply(netGasVolume, netGasPrice )

    let totalRevenue = math.add(netOilRevenue, netGasRevenue)

    // console.log("oil", netOilRevenue)
    // console.log("gas", netGasRevenue)
    
    // console.log("total", totalRevenue)


    // Calculating production tax costs
    let severanceTaxCost = math.multiply(severanceTax, totalRevenue)
    let adValoremTaxCost = math.multiply(adValoremTax, totalRevenue)

    // Calculating the monthly LOE costs
    let allMonthlyLOE = []

    for (let i=1; i<=numOfMonths; i++) {
        
        allMonthlyLOE.push(monthlyWellOperationCost*1000)
    }

    // Calculating net revenues
    let allOtherCosts = math.add(severanceTaxCost, adValoremTaxCost, allMonthlyLOE)
    let netTotalRevenue = math.subtract(totalRevenue, allOtherCosts)

    // Calculating total capex
    let allCapexCosts = drillingCosts + completionCosts + facilitiesCosts + pipelineCosts + contingencyCosts

    // Creating this in a sequence for graphing purposes
    let graphEarnings = netTotalRevenue


    // Decucting the capital expenses
    netTotalRevenue[0] = netTotalRevenue[0] - (allCapexCosts*1000) 

    
    // Calculating FreeCashFlows

    let freeCashFlows = netTotalRevenue

    // console.log(netTotalRevenue)
    



    // Calculating NPV10

    function calculateNPV(cashflows, discountRate) {
        let npv = 0

        for (let i=0; i < cashflows.length; i++) {
            npv += cashflows[i] / Math.pow((1+discountRate), i)
        }
    
        return npv
    }

    const annualDiscountRate = 0.10
    let monthlyDiscountRate = Math.pow((1 + annualDiscountRate), 1 / 12) - 1;

    // console.log(monthlyDiscountRate)

    let npv = calculateNPV(freeCashFlows, monthlyDiscountRate)

    // console.log("npv10 is", npv)



    // Calculating cumulative cash flows

    let monthlyTally= 0

    let cumulativeCash = []


    for (let i=0;  i < freeCashFlows.length;  i++ ) {

        monthlyTally = monthlyTally + freeCashFlows[i]

        cumulativeCash.push(monthlyTally)
    }

    // console.log(cumulativeCash)


    // Calculate ROI 

    let sumAllNetRevenue = math.sum(netTotalRevenue)

    // console.log(sumAllNetRevenue)
    // console.log(allCapexCosts)

    let ROI = (sumAllNetRevenue - (allCapexCosts*1000)) / (allCapexCosts*1000) 

    let roundedROI = Math.round(ROI * 100)/100

    // console.log(roundedROI)



    return (
        <>
            <FinancialSummary npv={npv} roundedROI={roundedROI} sumAllNetRevenue={sumAllNetRevenue} netOilPrice={netOilPrice} netGasPrice={netGasPrice} />
            
            <br></br>

            <br></br>
            <h2>Dashboards</h2>
            
            <Dashboards oilProductionCurve={oilProductionCurve} gasProductionCurve={gasProductionCurve} graphEarnings={freeCashFlows} cumulativeCash={cumulativeCash} />
        </>
    )
}


export default FinancialModel





