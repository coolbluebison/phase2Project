import React, {useState} from "react"



function OperatingAssumptions() {

    let obj = {"NRI-Before-Payout": "",
    "WI-Before-Payout":"",
    "NRI-After-Payout":"",
    "WI-After-Payout": "",
    "NYMEX-Oil-Pricing-Deduct": "",
    "Oil-Transportation-Cost": "",
    "Oil-Processing-Cost": "",
    "Hhub-Gas-Pricing-Deduct": "",
    "Gas-Transportation-Cost": "",
    "Gas-Processing-Cost": "",
    "Severance-Tax": "",
    "Ad-Valorem-Tax": "",
    "Monthly-Well-Operation-Cost": "",
    "Drilling-Costs": "",
    "Completion-Costs": "",
    "Facilities-Costs": "",
    "Pipeline-Costs": "",
    "Contingency-Costs": "" 
    }

    const [opsAssumptions, setOpsAssumptions] = useState(obj)


    function handleSubmit(e) {

        e.preventDefault()

        fetch('http://localhost:3000/formData/1', {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(opsAssumptions),
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data)
        })
        .catch((error) => {
            console.error("There was an error updating the data", error);
        });
    }

    function handleInputChange(e) {

        e.preventDefault()

        const { id, value } = e.target

        const updatedData = { ...opsAssumptions, [id]: value }
    
        setOpsAssumptions(updatedData)
        
    }


    return (


        <>
            <h2>Enter Operating Assumptions</h2>


            <form onSubmit={(e) => handleSubmit(e)} >
                <h4>Net Revenue Interest Assumptions</h4>

                <div id="NRI-Before-Payout">
                    <label for="NRI-Before-Payout">Net Revenue Interest - Before Payout (%): </label>
                    <input id="NRI-Before-Payout" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. 82.5%" pattern="^(100(\.0{1,2})?|[1-9]\d?(\.\d{1,2})?|\.\d{1,2})%?$"/>
                </div>


                <div id="WI-Before-Payout">
                    <label for="WI-Before-Payout">Working Interest - Before Payout (%): </label>
                    <input id="WI-Before-Payout" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. 100.0%" pattern="^(100(\.0{1,2})?|[1-9]\d?(\.\d{1,2})?|\.\d{1,2})%?$"/>
                </div>


                <div id="NRI-After-Payout">
                    <label for="NRI-After-Payout">Net Revenue Interest - After Payout (%): </label>
                    <input id="NRI-After-Payout" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. 82.5%" pattern="^(100(\.0{1,2})?|[1-9]\d?(\.\d{1,2})?|\.\d{1,2})%?$"/>
                </div>


                <div id="WI-After-Payout">
                    <label for="WI-After-Payout">Working Interest - After Payout (%): </label>
                    <input id="WI-After-Payout" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. 100.0%" pattern="^(100(\.0{1,2})?|[1-9]\d?(\.\d{1,2})?|\.\d{1,2})%?$"/>
                </div>



                <h4>Direct Cost Assumptions</h4>


                <h5>Oil Pricing Deducts and T&F Costs</h5>

                <div id="NYMEX-Oil-Pricing-Deduct">
                    <label for="NYMEX-Oil-Pricing-Deduct">Nymex to Delivery Point Pricing Deduct ($/Bbl): </label>
                    <input id="NYMEX-Oil-Pricing-Deduct" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. $3/Bbl" pattern="^\d+(\.\d+)?$"/>
                </div>


                <div id="Oil-Transportation-Cost">
                    <label for="Oil-Transportation-Cost">Oil Transportation Cost - Primary Pipeline ($/Bbl) </label>
                    <input id="Oil-Transportation-Cost" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. $3/Bbl" pattern="^\d+(\.\d+)?$"/>
                </div>


                <div id="Oil-Processing-Cost">
                    <label for="Oil-Processing-Cost">Oil Processing Cost ($/Bbl): </label>
                    <input id="Oil-Processing-Cost" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. $1/Bbl" pattern="^\d+(\.\d+)?$"/>
                </div>



                <h5>Gas Pricing Deducts and T&F Costs</h5>

                <div id="Hhub-Gas-Pricing-Deduct">
                    <label for="Hhub-Gas-Pricing-Deduct">H Hub to Delivery Point Pricing Deduct ($/Mcf): </label>
                    <input id="Hhub-Gas-Pricing-Deduct" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. $0.20/Mcf" pattern="^\d+(\.\d+)?$"/>
                </div>


                <div id="Gas-Transportation-Cost">
                    <label for="Gas-Transportation-Cost">Gas Transportation Cost - Primary Pipeline ($/Mcf) </label>
                    <input id="Gas-Transportation-Cost" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. $0.20/Mcf" pattern="^\d+(\.\d+)?$"/>
                </div>


                <div id="Gas-Processing-Cost">
                    <label for="Gas-Processing-Cost">Gas Processing Cost ($/Mcf): </label>
                    <input id="Gas-Processing-Cost" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. $0.20/Mcf" pattern="^\d+(\.\d+)?$"/>
                </div>



                <h4>Tax Expenses</h4>

                <div id="Severance-Tax">
                    <label for="Severance-Tax">Severance Tax (%): </label>
                    <input id="Severance-Tax" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. 4%" pattern="^(100(\.0{1,2})?|[1-9]\d?(\.\d{1,2})?|\.\d{1,2})%?$"/>
                </div>


                <div id="Ad-Valorem-Tax">
                    <label for="Ad-Valorem-Tax">Ad Valorem Tax (%): </label>
                    <input id="Ad-Valorem-Tax" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. 4%" pattern="^(100(\.0{1,2})?|[1-9]\d?(\.\d{1,2})?|\.\d{1,2})%?$"/>
                </div>



                <h4>Lease Operating Costs</h4>

                <div id="Monthly-Well-Operation-Cost">
                    <label for="Monthly-Well-Operation-Cost">Monthly Well Operating Costs ($Thousands/Month per Well): </label>
                    <input id="Monthly-Well-Operation-Cost" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. $3 (thousands per month)" pattern="^\d+(\.\d+)?$"/>
                </div>



                <h4>Capital Expenditures Costs</h4>

                <div id="Drilling-Costs">
                    <label for="Drilling-Costs">Drilling Costs ($Thousands): </label>
                    <input id="Drilling-Costs" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. $100 (thousands)" pattern="^\d+(\.\d+)?$"/>
                </div>

                <div id="Completion-Costs">
                    <label for="Completion-Costs">Completion Costs ($Thousands): </label>
                    <input id="Completion-Costs" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. $100 (thousands)" pattern="^\d+(\.\d+)?$"/>
                </div>

                <div id="Facilities-Costs">
                    <label for="Facilities-Costs">Facilities Costs ($Thousands): </label>
                    <input id="Facilities-Costs" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. $100 (thousands)" pattern="^\d+(\.\d+)?$"/>
                </div>

                <div id="Pipeline-Costs">
                    <label for="Pipeline-Costs">Facilities Costs ($Thousands): </label>
                    <input id="Pipeline-Costs" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. $100 (thousands)" pattern="^\d+(\.\d+)?$"/>
                </div>

                <div id="Contingency-Costs">
                    <label for="Contingency-Costs">Facilities Costs ($Thousands): </label>
                    <input id="Contingency-Costs" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. $100 (thousands)" pattern="^\d+(\.\d+)?$"/>
                </div>

                <button type="submit">Submit</button>
            </form>


            <br></br>

            



        </>

    )
}


export default OperatingAssumptions
















