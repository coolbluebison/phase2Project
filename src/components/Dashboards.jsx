import React from "react"
import FinancialModel from "./FinancialModel"
import ProductionGraph from "./ProductionGraph"
import EarningsGraph from "./EarningsGraph"
import CumulativeCash from "./CumulativeCash"



function Dashboards({oilProductionCurve, gasProductionCurve, graphEarnings, cumulativeCash}) {


    return(  
        <>
            <ProductionGraph oilProductionCurve= {oilProductionCurve} gasProductionCurve={gasProductionCurve} />
            <br></br>
            <EarningsGraph graphEarnings={graphEarnings} />
            <br></br>
            <CumulativeCash cumulativeCash = {cumulativeCash} />
        
        </>
    )
}

export default Dashboards







