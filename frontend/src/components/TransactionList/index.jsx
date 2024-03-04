import React, { useEffect } from 'react'
import {TransactionCard} from "../../components"
import { useTransaction } from '../../contexts'

export default function TransactionList() {
  const {transactions, setTransactions} = useTransaction()
  useEffect(() => {
    const getAccountData = async () => {
      try {
        const response = await fetch(`https://financial-tracker-auth.onrender.com/transaction/transactions/${sessionStorage.getItem("user_id")}`)
        if (response.status == 200) {
          const data = await response.json()
          setTransactions(data)
        }

      } catch (err) {
        console.error({ error: err })
      }
    }
    getAccountData()
  }, [sessionStorage.getItem("user_id")])
  return (
    <div className='transaction-list'>
      {transactions.map((t) =>
      <TransactionCard transaction={t} key={t.transaction_id}/>
        
      )}
    </div>
  )
}
