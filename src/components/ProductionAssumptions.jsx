import React, {useState} from "react"


function ProductionAssumptions() {

    let obj = { "Initial-Production-Rate-Oil": "",
    "Monthly-Oil-Production-Decline-Rate" : "",
    "Initial-Production-Rate-Gas": "",
    "Monthly-Gas-Production-Decline-Rate": ""
    }


    const [productionAssumptions, setProductionAssumptions] = useState(obj)


    function handleInputChange(e) {
        
        e.preventDefault()

        const {id, value } = e.target
        const updatedData = {...productionAssumptions, [id]:value}

        setProductionAssumptions(updatedData)
    }

    function handleSubmit(e) {

        e.preventDefault()

        fetch('http://localhost:3000/formData/1', {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(productionAssumptions),
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data)
        })
        .catch((error) => {
            console.error("There was an error updating the data", error);
        })

    } 



    return(
        <>

            <h2>Enter Production Assumptions</h2>
            
            <form onSubmit={(e) => handleSubmit(e)}>

                <div id="Initial-Production-Rate-Oil">
                    <label for="Initial-Production-Rate-Oil">Initial Production Rate - Oil (Bbl/day): </label>
                    <input id="Initial-Production-Rate-Oil" onChange={(e)=>{handleInputChange(e)}} type="text" placeholder="e.g. 1,000 (bbl/day)" pattern="^\d+(\.\d+)?$"/>
                </div>

                <div id="Monthly-Oil-Production-Decline-Rate">
                    <label for="Monthly-Oil-Production-Decline-Rate">Monthly Production Decline Rate - Oil (%): </label>
                    <input id="Monthly-Oil-Production-Decline-Rate" onChange={(e)=>{handleInputChange(e)}} type="text" placeholder="e.g. 5% (each month)" pattern="^(100(\.0{1,2})?|[1-9]\d?(\.\d{1,2})?|\.\d{1,2})%?$"/>
                </div>

                <div id="Initial-Production-Rate-Gas">
                    <label for="Initial-Production-Rate-Gas">Initial Production Rate - Gas (Mcf/day): </label>
                    <input id="Initial-Production-Rate-Gas" onChange={(e)=>{handleInputChange(e)}} type="text" placeholder="e.g. 1,000 (Mcf/day)" pattern="^\d+(\.\d+)?$"/>
                </div>

                <div id="Monthly-Production-Decline-Rate">
                    <label for="Monthly-Gas-Production-Decline-Rate">Monthly Production Decline Rate - Gas (%): </label>
                    <input id="Monthly-Gas-Production-Decline-Rate" onChange={(e)=>{handleInputChange(e)}} type="text" placeholder="e.g. 5% (each month)" pattern="^(100(\.0{1,2})?|[1-9]\d?(\.\d{1,2})?|\.\d{1,2})%?$"/>
                </div>

                <br></br>
                <button type="submit">Submit</button>

            </form>

        </>
    )
}

export default ProductionAssumptions













