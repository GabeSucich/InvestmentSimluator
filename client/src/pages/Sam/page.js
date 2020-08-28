import React, { useState } from 'react'
import { useMonthlyInvestmentContext } from "./utils/monthlyInvestmentState"
import Helper from "./utils/Helper"
import { UPDATE_ADJUSTED_MONTHLY_INVESTMENT, READY_UP, SET_ANNUAL_INCOME, SET_MONTHLY_INVESTMENT, ADD_MONTHLY_EXPENSE, CLEAR} from "./utils/actions"
import { SET_SIMULATION_DATA } from '../GatherInformation/utils/action'
import API from '../../utils/API'
import { Segment, Input, Button, Container } from 'semantic-ui-react'
import { useInformationContext } from '../GatherInformation/utils/InformationState'
import  Loader  from '../../components/Loader/index'
import ChartHandler from '../../components/ChartHandler'
import ChartOptions from "../../utils/ChartOptions"

export default function MonthlyInvestmentPage() {

    const [informationState, informationDispatch] = useInformationContext();
    const [state, dispatch] = useMonthlyInvestmentContext();
    const [annualIncome, setAnnualIncome] = useState();
    const [monthlyInvestment, setMonthlyInvestment] = useState();
    const [monthlyExpenses, setMonthlyExpenses] = useState();
    const [adjustedMonthlyInvestment, setAdjustedMonthlyInvestment] = useState();

    const validator = () => {
            return true
    }

    const handleExpenseSubmit = event => {
        dispatch({ type: ADD_MONTHLY_EXPENSE, newExpense: monthlyExpenses})
        dispatch({ type: UPDATE_ADJUSTED_MONTHLY_INVESTMENT })
        setMonthlyExpenses("")
    }

    const handleSubmit = event => {
        dispatch({ type: READY_UP })

        const startDate = Helper.findFirstDateInYear(informationState.history, informationState.startYear)
        const endDate = Helper.findLastDateInYear(informationState.history)
        console.log(state.monthlyInvestment)
        console.log(state.adjustedMonthlyInvestment)
        console.log(state.monthlyExpenses)
        API.getActionDates(20, startDate, endDate, informationState.symbol)
        .then(res => {
            console.log(informationState.investment)
            API.runMultipleSimulations([
                [informationState.symbol, startDate, endDate, informationState.investment, "monthlyInvestment", [state.monthlyInvestment, res]],
                [informationState.symbol, startDate, endDate, informationState.investment, "monthlyInvestment", [state.adjustedMonthlyInvestment, res]]
            ])
            .then(res => {
                informationDispatch({ type: SET_SIMULATION_DATA, data: res})
                // dispatch({ type: CLEAR })
            })
        })
    }

    if (!informationState.informationGathered) {
        return null;
    } else if (!state.ready) {

        return (

            <Container fluid textAlign="center">
                <Segment fluid>

                    <p>
                        What's your annual income?
                <span>
                            <Input size="mini" placeholder="Annual Income" value={annualIncome} onChange={(event, { value }) => dispatch({ type: SET_ANNUAL_INCOME, annualIncome: value})} />
                        </span>
                    </p>

                    <p>
                        What's your monthly investment?
                <span>
                            <Input size="mini" placeholder="Monthly Investment" value={monthlyInvestment} onChange={(event, { value }) => dispatch({ type: SET_MONTHLY_INVESTMENT, monthlyInvestment: value})} />
                        </span>
                    </p>


                    <p>
                        Total of your monthly expenses?
                <span>
                            <Input size="mini" placeholder="Monthly Expenses" value={monthlyExpenses} onChange={(event, { value }) => setMonthlyExpenses(value)}/>
                            <Button onClick={handleExpenseSubmit}>Add Monthly Expense</Button>
                        </span>
                    </p>

                    {/* <p>
                        Set adjusted?
                <span>
                            <Input size="mini" placeholder="sellHigh" value={adjustedMonthlyInvestment} onChange={(event, { value }) => dispatch({ type: SET_MONTHLY_INVESTMENT, monthlyInvestment: value})} />
                        </span>
                    </p> */}

                </Segment>

                {validator() ? <Button onClick={handleSubmit}>Run Simulation</Button> : null}


            </Container>

        )

    }

    else {
        return (
            <Container fluid textAlign="center">
            {!informationState.simulationData ? <Loader /> : <ChartHandler simulations={informationState.simulationData} labels={["Without expenses", "With expenses"]} options={ChartOptions.SamMonthlyOptions}/>}
            {!informationState.simulationData ? null : <Button primary onClick ={() => dispatch({type: CLEAR})}>Run New Simulation</Button>}
            </Container>
        )
     }
}