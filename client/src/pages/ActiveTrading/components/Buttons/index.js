import React from 'react'
import { Button, Label } from "semantic-ui-react"
import { useActiveTradingContext } from '../../utils/ActiveState'
import Helper from '../../utils/Helper'


export default function ActTradeSubBtn(props) {
    var intBL;
    var intBH;
    var intSL;
    var intSH;

    const [state, dispatch] = useActiveTradingContext()

    const handleSubmit = (event) => {
        event.preventDefault();

        checkHandOff();
        // checkHandOff();
      

    }
    const passOff = (intBL, intBH, intSL, intSH) => {
        console.log('validate passOff intBL = ' + intBL);
        console.log('validate passOff intBL = ' + intBH);
        console.log('validate passOff intBL = ' + intSL);
        console.log('validate passOff intBL = ' + intSH);

        if(!intBL || !intBH || !intSL || !intSH) {
            alert('Input must be an integer');
        }
    }

    const validate = () => {
        var intBL = Helper.verifyInt(state.buyLow);
        var intBH = Helper.verifyInt(state.buyHigh);
        var intSL = Helper.verifyInt(state.sellLow);
        var intSH = Helper.verifyInt(state.sellHigh);

        passOff(intBL, intBH, intSL, intSH);
    }

    const checkHandOff = () => { 
        validate();  
    } 

   

    // if(state.buyLow && state.buyHigh && state.sellLow && state.sellHigh) {
        return (
            <div>
                <Button className="btn-margin" color="olive" onClick={handleSubmit}>
                   Run Simulation!
                </Button>

            </div>
        )
    // } 
    // else {
    //     return null
    // }

}