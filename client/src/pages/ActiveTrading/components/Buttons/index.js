import React from 'react'
import { Button, Label } from "semantic-ui-react"
import { useActiveTradingContext } from '../../utils/ActiveState'
import Helper from '../../utils/Helper'


export default function ActTradeSubBtn(props) {

    const [state, dispatch] = useActiveTradingContext()

    var intBL = Helper.verifyInt(state.buyLow);
    var intBH = Helper.verifyInt(state.buyHigh);
    var intSL = Helper.verifyInt(state.sellLow);
    var intSH = Helper.verifyInt(state.sellHigh);

    const handleSubmit = (event) => {
        event.preventDefault();

        checkHandOff();
        // checkHandOff();
      

    }

    const checkHandOff = () => {
        // console.log('intBL = ' + intBL);
        // console.log('intBH = ' + intBH);
        // console.log('intSL = ' + intSL);
        // console.log('intSH = ' + intSH);
        
        if(intBL && intBH && intSL && intSH){
            console.log("all ints ready");
        } else {
            console.log('not all ints ready');
        }

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