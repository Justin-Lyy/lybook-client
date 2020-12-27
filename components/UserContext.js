import { createContext, useContext } from 'react'
import React from 'react'

export const AppContext = createContext();

const intialToken = {a:1}
const reducer = (state, action) => {
    console.log(action)
    if (action.type === 'SUCCESS') {
        return {
            ...action.new_token
        }
    }
}

export function AppWrapper ({children}) {
    const [token, setToken] = React.useReducer(reducer, intialToken)

    const test = ()=> {
        return [token, setToken]
    }
    
    return (
        <AppContext.Provider value={{token, setToken}}>
            {children}
        </AppContext.Provider>
    )
}

// export function useAppContext() {
//     return useContext(AppContext)
// }