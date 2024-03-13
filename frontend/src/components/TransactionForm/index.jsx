import React, { useState, useEffect } from 'react'
import { useTransaction, useBalance } from '../../contexts'
export default function TransactionForm() {
  const { transactions, setTransactions } = useTransaction()
  const { balance, setBalance } = useBalance()
  const [reference, setReference] = useState()
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState("Miscellaneous")
  const [deposit, setDeposit] = useState(false)
  const [message,setMessage] = useState("")

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
    if (amount==0) {
      setMessage(`Cannot make a transaction of ${balance[0]}0`)
      setTimeout(()=> {
        setMessage("")
      },2500)
    } else {

      createTransaction()
      setAmount(0)
      setCategory("")
      setReference("")
    }
  }


  return (
    <form onSubmit={handleSubmit} className='transaction-form'>
      <div className="reference">
      <label className='form-label'>Reference </label>
      <input type="text" onChange={handleReference} value={reference} />
      </div>
      <div className="amount">
      <label className='form-label'>Amount </label>
      <input type="number" min="0" step="0.01" onChange={handleAmount} value={amount} />

      </div>
      <div className="switch-and-category">
        
      <div className="deposit-switch">
      {
        deposit?<label className='deposit-label'>Deposit</label>:<label className='deposit-label'>Withdraw</label>
      }
      
      <label className="switch">

        <input type="checkbox" onChange={handleToggle} />
        <span className="slider round"></span>
      </label>
      </div>
      <div className="category">

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
      </div>
      </div>
      <input type="submit" />
      <p>{message}</p>
    </form>
  )
}
