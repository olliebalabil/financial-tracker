import React, { useState, useEffect } from 'react'
import { useTransaction } from '../../contexts'
export default function TransactionForm() {
  const {transactions,setTransactions} = useTransaction()
  const [reference,setReference] = useState("")
  const [amount,setAmount] = useState(0)
  const [category,setCategory] = useState("Other")

  const handleReference = (e) => {
    setReference(e.target.value)
  }
  const handleAmount = (e) => {
    setAmount(e.target.value)
  }
  const handleCategory = (e) => {
    setCategory(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const createTransaction = async () => {
      try {
        const options = {
          method: "POST",
          body: JSON.stringify({
            user_id: sessionStorage.getItem("user_id"),
            reference: reference,
            amount: amount,
            category: category          
          }),
          headers: {
            "Content-Type": "application/json"
          } 
        }
        const response = await fetch("https://financial-tracker-auth.onrender.com/transaction/transaction", options)
        if (response.status == 200) {
          const data = await response.json()
          console.log(data)
          setTransactions([data,...transactions])
        }
      } catch (err) {
        console.error({error:err})
      }
    }
    createTransaction()
    setAmount(0)
    setCategory("")
    setReference("")
  }


  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder='Reference' onChange={handleReference}/>
      <label>Amount: </label>
      <input type="number" min="0" step="0.01" onChange={handleAmount}/>
      <label>Category: </label>
      <select onChange={handleCategory} defaultValue="Other">
        <option value="Food">Food</option>
        <option value="Bills">Bills</option>
        <option value="Other" >Other</option>
      </select>
      <input type="submit" />
    </form>
  )
}
