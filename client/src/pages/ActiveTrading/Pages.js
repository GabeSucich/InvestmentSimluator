import React, { useState, useEffect } from 'react'
import { StandardForm } from "../../SemanticUI/Forms/index"
import { useActiveTradingContext } from "./utils/ActiveState"
import Helper from "./utils/Helper"
// import API from "../../../../../utils/API"
import { SET_PARAMS, CLEAR_DATA, } from "./utils/activeAction"
import { SET_SIMULATION_DATA } from '../GatherInformation/utils/action'
// import "./style.css"
import API from '../../utils/API'
import { Segment, Input, Button, Container } from 'semantic-ui-react'
import { useInformationContext } from '../GatherInformation/utils/InformationState'
import  Loader  from '../../components/Loader/index'
import ChartHandler from '../../components/ChartHandler'


export default function AllForm() {

    console.log(useActiveTradingContext());

    const [informationState, informationDispatch] = useInformationContext();
    const [state, dispatch] = useActiveTradingContext();
    const [buyLow, setBuylow] = useState();
    const [buyHigh, setBuyhigh] = useState();
    const [sellLow, setSelllow] = useState();
    const [sellHigh, setSellhigh] = useState();

    const validator = () => {
        if ((Helper.verifyDrop(sellLow)) && (Helper.verifyDrop(buyLow)) && (Helper.verifyIncrease(buyHigh)) && (Helper.verifyIncrease(sellHigh))) {
            return true
        } return false
    }

    const handleSubmit = event => {
        dispatch({ type: SET_PARAMS, buyLow: buyLow, buyHigh: buyHigh, sellLow: sellLow, sellHigh: sellHigh })
        // API call 

        const startDate = Helper.findFirstDateInYear(informationState.history, informationState.startYear)
        const endDate = Helper.findLastDateInYear(informationState.history)

        // start, end, symbol, BL, BH, SL, SH
        API.runActiveTrading(startDate, endDate, informationState.symbol, buyLow, buyHigh, sellLow, sellHigh)
        // check this. 
          .then(res => {
             API.runMultipleSimulations([
               [informationState.symbol, startDate, endDate, informationState.investment, "activeTrading", [res]],
               [informationState.symbol, startDate, endDate, informationState.investment, "buyAndWait", []],
      
               ])
               .then(res => {
                console.log(res)
                informationDispatch({ type: SET_SIMULATION_DATA, data: res })
               })
          })
        //

        // setState .... 
    }

    if (!informationState.informationGathered) {
        return null;
    } else if (!state.buyLow) {




        return (

            <div>
                <Segment fluid>

                    <p>
                        This is the buy low
                <span>
                            <Input size="mini" placeholder="buyLow" value={buyLow} onChange={(event, { value }) => setBuylow(value)} />
                        </span>
                    </p>

                    <p>
                        This is the buy high
                <span>
                            <Input size="mini" placeholder="buyHigh" value={buyHigh} onChange={(event, { value }) => setBuyhigh(value)} />
                        </span>
                    </p>


                    <p>
                        This is sell high
                <span>
                            <Input size="mini" placeholder="sellHigh" value={sellHigh} onChange={(event, { value }) => setSellhigh(value)} />
                        </span>
                    </p>

                    <p>
                        This is sell low
                <span>
                            <Input size="mini" placeholder="sellLow" value={sellLow} onChange={(event, { value }) => setSelllow(value)} />
                        </span>
                    </p>

                </Segment>

                {validator() ? <Button onClick={handleSubmit}>Run Simulation</Button> : null}


            </div>

        )
    }

    else {
       return (
           <Container fluid>
           {!informationState.simulationData ? <Loader /> : <ChartHandler simulations={informationState.simulationData} labels={[informationState.symbol]} />}
           </Container>
       )
    }

    

}