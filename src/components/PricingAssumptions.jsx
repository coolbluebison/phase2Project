import React, {useState} from "react"



function PricingAssumptions() {

    let obj = {"Avg-Oil-Price-During-Period": "",
    "Avg-Gas-Price-During-Period":""
    }

    const [priceAssumptions, setPriceAssumptions] = useState(obj)


    function handleSubmit(e) {

        e.preventDefault()

        fetch('http://localhost:3000/formData/1', {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(priceAssumptions),
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data)
        })
        .catch((error) => {
            console.error("There was an error updating the data", error);
        })
    }

    function handleInputChange(e) {

        e.preventDefault()

        const { id, value } = e.target

        const updatedData = { ...priceAssumptions, [id]: value }
        setPriceAssumptions(updatedData)
    }


    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <h2>Enter Pricing Assumptions</h2>

                <div id="Avg-Oil-Price-During-Period">
                    <label for="Avg-Oil-Price-During-Period">Avg. Oil Price During Period ($/Bbl): </label>
                    <input id="Avg-Oil-Price-During-Period" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. $75/bbl" pattern="^\d+(\.\d+)?$"/>
                </div>

                <div id="Avg-Gas-Price-During-Period">
                    <label for="Avg-Gas-Price-During-Period">Avg. Gas Price During Period ($/Mcf): </label>
                    <input id="Avg-Gas-Price-During-Period" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. $4/Mcf" pattern="^\d+(\.\d+)?$"/>
                </div>

                <br></br>

                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default PricingAssumptions