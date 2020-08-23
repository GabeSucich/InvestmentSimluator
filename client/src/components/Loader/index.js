import React from 'react'
import ReactLoading from "react-loading"
import "./style.css"

export default function Loader(props) {


    return (
        <div>
            <ReactLoading {...props} color={"green"} className={"svg-center " + props.className}/>
            <p>Running Simulations ...</p>
        </div>
        
    )

    

}