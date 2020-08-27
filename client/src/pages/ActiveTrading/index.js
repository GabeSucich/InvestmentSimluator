import React from 'react'
import { ActiveTradingProvider }from './utils/ActiveState'
import AllForm from './Pages'


function ActiveTrading () {

    console.log(ActiveTradingProvider)

    return (
        <ActiveTradingProvider>
            <AllForm/>
        </ActiveTradingProvider>
    )

}

export default ActiveTrading