import React, {createContext, useContext, useReducer, useCallback} from "react"
import {CLEAR_DATA, SET_DATA, NEW_DATA, SELECT_REGION, LOADING} from "./action"

const TaxEffectContext = createContext()

const reducer = (state, action) => {
    switch (action.type) {
        case SELECT_REGION:
            const sameTax = state.currentRegions.filter(region => region.tax === action.region.taxRate)
            if (state.currentRegions.includes(action.region)) {
                const newRegions = state.currentRegions.filter(region => region !== action.region)
                return {...state, currentRegions: newRegions}
            }
            else if (state.currentRegions.length >= 4) {
                return {...state, currentRegions: [...state.currentRegions.slice(1), action.region]}
            }
            else if (sameTax.length > 0) {
                return {...state, currentRegions: [...state.currentRegions.filter(region => region !== sameTax[0]), action.region]}
            }
            else {
                return {...state, currentRegions: [...state.currentRegions, action.region]}
            }
        case CLEAR_DATA:
            return {currentRegions: [], data: null, loading: false}

        case SET_DATA:
            return {currentRegions: [], data: action.data, loading: false}
        
        case LOADING: 
            return {...state, loading: true}
        
    }
}

function TaxEffextProvider({value=[], ...props}) {
    const [state, dispatch] = useReducer(reducer, {
        currentRegions: [],
        data: null,
        loading: false
    })

    return <TaxEffectContext.Provider value={[state, dispatch]} {...props}/>
}

function useTaxEffectContext() {
    return useContext(TaxEffectContext)
}

export {TaxEffextProvider, useTaxEffectContext}

