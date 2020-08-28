import React, {useContext, useReducer, createContext} from 'react'
import {LOGIN_USER, CREATE_NEW_USER} from "./action"
 
const UserContext = createContext()
const {Provider} = UserContext

const reducer = (state, action) => {

    switch (action.type) {

        case LOGIN_USER:

            return {...state, user: action.username, awaitingIntro: false}

        case CREATE_NEW_USER:

            return {...state, user: action.username, awaitingIntro: true}
    }
}

const UserProvider = ({value = [], ...props}) => {

    const [state, dispatch] = useReducer(reducer, {
        user: null,
        awaitingIntro: false
    })
    return (
        <Provider value={[state, dispatch]} {...props}/>
   )
}

const useUserContent = () => {
    return useContext(UserContext)
}

export {useUserContent, UserProvider}