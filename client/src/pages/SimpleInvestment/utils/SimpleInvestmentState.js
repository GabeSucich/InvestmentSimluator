import React, {createContext, useContext, useReducer} from "react"
import {} from "./action"

const SimpleInvestmentContext = createContext()
const {Provider} = SimpleInvestmentContext

const reducer = (state, action) => {
    switch (action.type) {

        
    }
}

function SimpleInvestmentProvider({value=[], ...props}) {
    const [state, dispatch] = useReducer(reducer, {
        
    })

    return <Provider value={[state, dispatch]} {...props}/>
}

function useSimpleInvestmentContext() {
    return useContext(SimpleInvestmentContext)
}

export {SimpleInvestmentProvider, useSimpleInvestmentContext}

