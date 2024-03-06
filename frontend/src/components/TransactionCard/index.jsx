import React, { useState } from 'react'
import { useTransaction, useBalance } from '../../contexts'
import binIcon from "../../assets/bin.png"

export default function TransactionCard({ transaction }) {
  const { transactions, setTransactions } = useTransaction()
  const { balance, setBalance } = useBalance()

  const handleDelete = () => {
    const deleteTransaction = async () => {
      try {
        const options = {
          method: "DELETE",
          body: JSON.stringify({
            transaction_id: transaction.transaction_id,
            user_id: transaction.user_id
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }
        const response = await fetch("https://financial-tracker-auth.onrender.com/transaction/transaction", options)
        const data = await response.json()
        if (response.status == 200) {
          setTransactions([...transactions].filter(t => t.transaction_id != data.transaction_id))

          setBalance([balance[0], (parseFloat(balance[1]) + parseFloat(data.amount)).toFixed(2)])
        }
      } catch (err) {
        console.error({ error: err })
      }
    }
    deleteTransaction()
  }

  return (
    <div className={`transaction-card`} key={transaction.transaction_id}>
      <div className={`circle ${(transaction.amount > 0) ? "withdraw" : "deposit"}`}></div>
      <h1 className="title">{transaction.reference}</h1>
      <div className='amount-category'>
        <h2 className='amount'>{balance[0]}{Math.abs(parseFloat(transaction.amount)).toFixed(2)}</h2>
        <h2>{transaction.category}</h2>
      </div>
      <img src={binIcon} onClick={handleDelete} alt="delete" />
    </div>
  )
}
