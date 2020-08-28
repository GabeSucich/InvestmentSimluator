import React, { useState } from 'react'
import { useMonthlyInvestmentContext } from "./utils/monthlyInvestmentState"
import Helper from "./utils/Helper"
import { SET_PARAMS, SET_ANNUAL_INCOME, SET_MONTHLY_INVESTMENT, ADD_MONTHLY_EXPENSE, CLEAR} from "./utils/actions"
import { SET_SIMULATION_DATA } from '../GatherInformation/utils/action'
import API from '../../utils/API'
import { Segment, Input, Button, Container } from 'semantic-ui-react'
import { useInformationContext } from '../GatherInformation/utils/InformationState'
import  Loader  from '../../components/Loader/index'
import ChartHandler from '../../components/ChartHandler'

export default function monthlyInvestmentPage() {

    const [informationState, informationDispatch] = useInformationContext();
    const [state, dispatch] = useMonthlyInvestmentContext();
    const [annualIncome, setAnnualIncome] = useState();
    const [monthlyInvestment, setMonthlyInvestment] = useState();
    const [monthlyExpenses, setMonthlyExpenses] = useState([]);
    const [adjustedMonthlyInvestment, setAdjustedMonthlyInvestment] = useState();

    const handleSubmit = event => {
        dispatch({ type: SET_PARAMS, annualIncome: annualIncome, monthlyInvestment: monthlyInvestment, monthlyExpenses: monthlyExpenses})

        const startDate = Helper.findFirstDateInYear(informationState.history, informationState.startYear)
        const endDate = Helper.findLastDateInYear(informationState.history)
        API.getActionDates(20, startDate, endDate, informationState.symbol)
        .then(res => {
            API.runMultipleSimulations([
                [informationState.symbol, startDate, endDate, informationState.investment, "monthlyInvestment", [state.monthlyInvestment, res]]
            ])
        })
    }

    if (!informationState.informationGathered) {
        return null;
    } else if (!state.monthlyInvestment) {

        return (

            <Container fluid textAlign="center">
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


            </Container>

        )

    }
}