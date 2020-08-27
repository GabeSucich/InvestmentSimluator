import React, { useState, useEffect } from 'react'
import { StandardForm } from "../../../../../SemanticUI/Forms/index"
import { useActiveTradingContext } from '../../../utils/ActiveState'
import Helper from "../../../utils/Helper"
// import API from "../../../../../utils/API"
import { SET_BUYLOW, SET_BUYHIGH, SET_SELLLOW, SET_SELLHIGH, SYMBOLLOADING, CLEAR_DATA, INVALID } from "../../../utils/activeAction"
import { Form, Button, Segment } from 'semantic-ui-react'
// import "./style.css"
import { Segment, Input, Button, Container } from 'semantic-ui-react'
import { useSimpleInvestmentContext } from '../../../../GatherInformation/utils/GlobalState'


export default function AllForm() {

    const [informationState, informationDispatch] = useSimpleInvestmentContext();
    const [state, dispatch] = useActiveTradingContext();
    const [invalid, setInvalid] = useState(false);
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




        //

        // setState .... 
    }

    if (!informationState.informationGathered) {
        return null;
    } else if (!informationState.loadingSimulation) {




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
                            <Input size="mini" placeholder="sellLow" value={sellLow} onChange={(event, { value }) => setSellLow(value)} />
                        </span>
                    </p>

                </Segment>

                {validator() ? <Button onClick={handleSubmit}>Run Simulation</Button> : null}


            </div>

        )
    }

    else {
       { informationState.simulationData ? }
    }

}