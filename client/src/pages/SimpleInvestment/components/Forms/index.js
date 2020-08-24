import React from 'react'
import {useSimpleInvestmentContext} from "../../utils/SimpleInvestmentState"
import {StandardForm} from "../../../../SemanticUI/Forms"


export function SymbolForm(props) {

    const [state, dispatch] = useSimpleInvestmentContext()

    if (state.activeForm === 0) {
        return (
            <StandardForm>
                
            </StandardForm>
        )
    }

}