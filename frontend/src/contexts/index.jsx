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

const BalanceContext = createContext();
export const BalanceProvider = ({children}) => {
    const [balance,setBalance] = useState([])

    return (
        <BalanceContext.Provider value={{balance,setBalance}}>
            {children}
        </BalanceContext.Provider>
    )
}
export const useBalance = () => useContext(BalanceContext)