import React from 'react'
import ReactLoading from "react-loading"

export default function Loader(props) {


    return (
        <div className="center-align">
            <ReactLoading {...props} color={"green"} className="center-align"/>
            <p>Running Simulations ...</p>
        </div>
        
    )

    

}