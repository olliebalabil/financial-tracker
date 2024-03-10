import React, { useState, useEffect } from 'react'
import { useTransaction, useBalance } from '../../contexts'
export default function TransactionForm() {
  const { transactions, setTransactions } = useTransaction()
  const { balance, setBalance } = useBalance()
  const [reference, setReference] = useState()
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState("Other")
  const [deposit, setDeposit] = useState(false)

  const handleReference = (e) => {
    setReference(e.target.value)
  }
  const handleAmount = (e) => {
    setAmount(e.target.value)
  }
  const handleCategory = (e) => {
    setCategory(e.target.value)
  }
  const handleToggle = (e) => {
    setDeposit(!deposit)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const createTransaction = async () => {
      try {
        let newAmount = amount
        if (deposit) {
          newAmount = -newAmount
        }
        const options = {
          method: "POST",
          body: JSON.stringify({
            user_id: sessionStorage.getItem("user_id"),
            reference: reference,
            amount: newAmount,
            category: category
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }
        const response = await fetch("https://financial-tracker-auth.onrender.com/transaction/transaction", options)
        if (response.status == 200) {
          const data = await response.json()
          setTransactions([data, ...transactions])
          setBalance([balance[0], (balance[1] - data.amount).toFixed(2)])
        }
      } catch (err) {
        console.error({ error: err })
      }
    }
    createTransaction()
    setAmount(0)
    setCategory("")
    setReference("")
  }


  return (
    <form onSubmit={handleSubmit} className='transaction-form'>
      <div className="reference">
      <label>Reference </label>
      <input type="text" onChange={handleReference} value={reference} />
      </div>
      <div className="amount">
      <label>Amount </label>
      <input type="number" min="0" step="0.01" onChange={handleAmount} value={amount} />

      </div>
      <label>Deposit</label>
      <label className="switch">

        <input type="checkbox" onChange={handleToggle} />
        <span className="slider round"></span>
      </label>

      <label>Category </label>
      <select onChange={handleCategory} value={category}>

        <option value="Miscellaneous">Miscellaneous</option>
        <option value="Groceries">Groceries</option>
        <option value="Housing">Housing</option>
        <option value="Utilities">Utilities</option>
        <option value="Travel">Travel</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Income">Income</option>



      </select>
      <input type="submit" />
    </form>
  )
}
