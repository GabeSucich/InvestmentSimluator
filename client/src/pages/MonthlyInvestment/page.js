import React, { useState } from 'react'
import { useMonthlyInvestmentContext } from "./utils/monthlyInvestmentState"
import Helper from "./utils/Helper"
import { UPDATE_ADJUSTED_MONTHLY_INVESTMENT, READY_UP, SET_ANNUAL_INCOME, SET_MONTHLY_INVESTMENT, ADD_MONTHLY_EXPENSE, CLEAR } from "./utils/actions"
import { SET_SIMULATION_DATA } from '../GatherInformation/utils/action'
import API from '../../utils/API'
import { Segment, Input, Button, Container } from 'semantic-ui-react'
import { useInformationContext } from '../GatherInformation/utils/InformationState'
import Loader from '../../components/Loader/index'
import ChartHandler from '../../components/ChartHandler'
import ChartOptions from "../../utils/ChartOptions"

export default function MonthlyInvestmentPage() {

    const [informationState, informationDispatch] = useInformationContext();
    const [state, dispatch] = useMonthlyInvestmentContext();
    const [annualIncome, setAnnualIncome] = useState();
    const [annualIncomeSpecified, setAnnualIncomeSpecified] = useState();
    const [monthlyInvestment, setMonthlyInvestment] = useState();
    const [choseCustomMonthlyInvestment, setChoseCustomMonthlyInvestment] = useState();
    const [monthlyInvestmentSpecified, setMonthlyInvestmentSpecified] = useState();
    const [monthlyExpenses, setMonthlyExpenses] = useState();
    const [monthlyExpensesName, setMonthlyExpensesName] = useState();
    const [addAnotherExpense, setAddAnotherExpense] = useState();
    const [expenseJustAdded, setExpenseJustAdded] = useState();
    const [allInformationGathered, setAllInformationGathered] = useState();
    const [adjustedMonthlyInvestment, setAdjustedMonthlyInvestment] = useState();

    const clearAll = event => {
        dispatch({ type: CLEAR })
        setAnnualIncome("")
        setAnnualIncomeSpecified(false)
        setMonthlyInvestment("")
        setChoseCustomMonthlyInvestment(false)
        setMonthlyInvestmentSpecified(false)
        setMonthlyExpenses("")
        setMonthlyExpensesName("")
        setAddAnotherExpense(false)
        setExpenseJustAdded(false)
        setAllInformationGathered(false)
    }

    const handleAnnualIncomeSubmit = event => {
        dispatch({ type: SET_ANNUAL_INCOME, annualIncome: annualIncome })
        setAnnualIncomeSpecified(true)
    }

    const handleRecommendedMonthlyInvestment = event => {
        dispatch({ type: SET_MONTHLY_INVESTMENT, monthlyInvestment: annualIncome / 120 })
        setMonthlyInvestmentSpecified(true)
        setAddAnotherExpense(true)
    }

    const handleCustomMonthlyInvestment = event => {
        setChoseCustomMonthlyInvestment(true)
    }

    const handleMonthlyInvestmentSubmit = event => {
        dispatch({ type: SET_MONTHLY_INVESTMENT, monthlyInvestment: monthlyInvestment })
        setMonthlyInvestmentSpecified(true)
        setAddAnotherExpense(true)
    }

    const handleExpenseSubmit = event => {
        const newExpense = {
            name: monthlyExpensesName,
            cost: monthlyExpenses
        }
        dispatch({ type: ADD_MONTHLY_EXPENSE, newExpense: newExpense })
        dispatch({ type: UPDATE_ADJUSTED_MONTHLY_INVESTMENT })
        setMonthlyExpensesName("")
        setMonthlyExpenses("")
        setAddAnotherExpense(false)
        setExpenseJustAdded(true)
    }

    const handleAddAnotherMonthlyExpense = event => {
        setAddAnotherExpense(true)
        setExpenseJustAdded(false)
    }

    const handleComplete = event => {
        setAllInformationGathered(true)
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
                        informationDispatch({ type: SET_SIMULATION_DATA, data: res })
                        // dispatch({ type: CLEAR })
                    })
            })
    }

    if (!informationState.informationGathered) {
        return null;
    } else if (!state.ready) {

        return (

            <Container fluid textAlign="center">

                <p>
                    What was your annual income over the specified time frame?
                <span>
                        <Input size="mini" placeholder="Annual Income" value={annualIncome} onChange={(event, { value }) => setAnnualIncome(value)} />
                        <Button onClick={handleAnnualIncomeSubmit}>Set Annual Income</Button>
                    </span>
                </p>

                {annualIncomeSpecified ? <p>Based on your annual income, we recommend investing ${annualIncome / 120} monthly into your portfolio</p> : null}

                {annualIncomeSpecified ? <p>
                    Do you want to run your simulation with this monthly investment? Or would you like to choose a custom one.
                <span>
                        <Button onClick={handleRecommendedMonthlyInvestment}>Use Recommended Monthly Investment</Button>
                        <Button onClick={handleCustomMonthlyInvestment}>Set Custom Monthly Investment</Button>
                    </span>
                </p> : null}


                {choseCustomMonthlyInvestment ? <p>
                    Specify your desired monthly investment
                <span>
                        <Input size="mini" placeholder="Monthly Investment" value={monthlyInvestment} onChange={(event, { value }) => setMonthlyInvestment(value)} />
                        <Button onClick={handleMonthlyInvestmentSubmit}>Set Monthly Investment</Button>
                    </span>
                </p> : null}


                {monthlyInvestmentSpecified ? <p>Let's start tallying your unnecessary monthly expenses</p> : null}

                {monthlyInvestmentSpecified && addAnotherExpense ? <p>
                    Add a new monthly expense
                <span>
                        <Input size="mini" placeholder="Name of expense (e.g. Netflix subscription, food delivery, etc...)" value={monthlyExpensesName} onChange={(event, { value }) => setMonthlyExpensesName(value)} />
                        <Input size="mini" placeholder="Monthly Cost" value={monthlyExpenses} onChange={(event, { value }) => setMonthlyExpenses(value)} />
                        <Button onClick={handleExpenseSubmit}>Add Monthly Expense</Button>
                    </span>
                </p> : null}

                {expenseJustAdded ? <p>
                    Do you want to add another monthly expense?
                <span>
                        <Button onClick={handleAddAnotherMonthlyExpense}>Add another</Button>
                        <Button onClick={handleComplete}>No, I'm done</Button>
                    </span>
                </p> : null}

                {allInformationGathered ? <Button onClick={handleSubmit}>Run Simulation</Button> : null}


            </Container>

        )

    }

    else {
        return (
            <Container fluid textAlign="center">
                {!informationState.simulationData ? <Loader /> : <ChartHandler simulations={informationState.simulationData} labels={["Without expenses", "With expenses"]} options={ChartOptions.SamMonthlyOptions} />}
                {!informationState.simulationData ? null : <Button primary onClick={clearAll}>Run New Simulation</Button>}
            </Container>
        )
    }
}