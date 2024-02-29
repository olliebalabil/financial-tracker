import React, { useState, useContext, createContext } from "react";


const TransactionContext = createContext();
export const TransactionProvider = ({children}) => {
    const [transactions,setTransactions] = useState([])

    return (
        <TransactionContext.Provider value={{transactions,setTransactions}}>
            {children}
        </TransactionContext.Provider>
    )
}
export const useTransaction = () => useContext(TransactionContext)

