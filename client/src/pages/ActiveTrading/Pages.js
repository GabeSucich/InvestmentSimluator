import React, { useState } from 'react'
import { useActiveTradingContext } from "./utils/ActiveState"
import Helper from "./utils/Helper"
import { SET_PARAMS, CLEAR_DATA } from "./utils/activeAction"
import { SET_SIMULATION_DATA } from '../GatherInformation/utils/action'
import API from '../../utils/API'
import { Segment, Input, Button, Container } from 'semantic-ui-react'
import { useInformationContext } from '../GatherInformation/utils/InformationState'
import Loader from '../../components/Loader/index'
import ChartHandler from '../../components/ChartHandler'
import './style.css'
import AccordionExample from '../../components/AccordinanActive'
import ActBar from './components/ActBar'
import ChartOptions from "../../utils/ChartOptions"
import colorRandomize from "../../utils/colorRandomize"

const Colors = colorRandomize()

export default function AllForm() {

    const BarOptions = ChartOptions.StandardBarOption
    var labelsGraph;

    const [informationState, informationDispatch] = useInformationContext();
    const [state, dispatch] = useActiveTradingContext();
    const [buyLow, setBuylow] = useState();
    const [buyHigh, setBuyhigh] = useState();
    const [sellLow, setSelllow] = useState();
    const [sellHigh, setSellhigh] = useState();
    var inputReady = true;

    const validator = () => {
        if ((Helper.verifyDrop(sellLow)) && (Helper.verifyDrop(buyLow)) && (Helper.verifyIncrease(buyHigh)) && (Helper.verifyIncrease(sellHigh))) {
            return true
        } return false
    }



    const handleSubmit = event => {

        if (!buyLow && !buyHigh && !sellLow && !sellHigh) {
            inputReady = false;
            console.log('inputReady = ' + inputReady);
            // alert('Inputs must be filled in before simulation runs again.')
        }

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
                        setBuyhigh("")
                        setBuylow("")
                        setSellhigh("")
                        setSelllow("")
                        labelsGraph=[informationState.symbol + " Active Strat", "Buy And Wait"];

                        
                    })
            })
        //

        // setState .... 
    }

    if (!informationState.informationGathered) {
        return null;
    } else if (!state.buyLow) {




        return (

            <Container fluid textAlign="center">
                <Segment fluid>
                    <AccordionExample />
                </Segment>
                {inputReady === false ? <p>All inputs must be filled in before the next simulation is run</p> : null}
                <Segment fluid>
                    <p>
                        All inputs must be numbers.*
                    </p>
                    <p>
                    I want to buy - if the price of the stock drops below {"    "}
                        <span>
                            <Input size="mini" placeholder="ex: 4" value={buyLow} onChange={(event, { value }) => setBuylow(value)} />
                        </span>
                        {"    "} percent.
                    </p>
                    <p>
                    I want to buy - if the price of the stock exceeds {"    "}
                        <span>
                            <Input size="mini" placeholder="ex: 4" value={buyHigh} onChange={(event, { value }) => setBuyhigh(value)} />
                        </span>
                        {"    "} percent. 
                    </p>
                    <p>
                    I want to sell - if the price of the stock drops below {"    "}
                        <span>
                            <Input size="mini" placeholder="ex: 10" value={sellLow} onChange={(event, { value }) => setSelllow(value)} />
                        </span>
                        {"    "} percent.
                    </p>
                    <p>
                    I want to sell - if the price of the stock exceeds {"    "}
                        <span>
                            <Input size="mini" placeholder="ex: 70" value={sellHigh} onChange={(event, { value }) => setSellhigh(value)} />
                        </span>
                        {"    "} percent.
                    </p>

                    <br></br>
                    <br></br>
                </Segment>

                {validator() ? <Segment className="validBtn"><Button onClick={handleSubmit}>Run Simulation</Button></Segment> : null}



            </Container>

        )
    }

    else {
        return (
            <Container fluid textAlign="center">
                {/* {state.data ? <TaxBar backgroundColor={labels.map((_, index) => randomizedColors[index])} simulations={state.data} taxRates={taxRates} labels={labels} options={BarOptions} /> : null} */}
                {/* {!informationState.simulationData ? <ActBar backgroundColor={labels.map((_, index) => randomizedColors[index])} simulations={state.data} taxRates={taxRates} labels={labels} options={BarOptions} /> : null}; */}

                {!informationState.simulationData ? <Loader /> : <ActBar simulations={informationState.simulationData} labels={[informationState.symbol + " Active Strat", "Buy And Wait"]} options={BarOptions}  backgroundColor={Colors.slice(0,2)}/>}
                {!informationState.simulationData ? null : <ChartHandler simulations={informationState.simulationData} labels={[informationState.symbol + " Active Strat", "Buy And Wait"]} borderColor={Colors.slice(0,2)}/>}

    
                <br></br>
                <br></br>
                {!informationState.simulationData ? null : <Button primary onClick={() => dispatch({ type: CLEAR_DATA })}>Run New Simulation</Button>}
            </Container>
        )
    }



}