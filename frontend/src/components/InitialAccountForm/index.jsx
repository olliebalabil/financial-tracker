import React, { useState } from 'react'


export default function InitialAccountForm({inputValue}) {
  const [initialAmount, setInitialAmount] = useState(0)
  const handleInitialAmount = (e) => {
    setInitialAmount(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const createAccount = async () => {
      try {
        const options = {
          method: "POST",
          body: {
            "id": 0,
            "account_Name": inputValue,
            "initial_balance": initialAmount,
            "current_balance": 0,
            "currency": "GPD"
          },
          headers:{
            "Content-Type":"application/json"
          }
        }
        const response = await fetch("http://localhost:5114/api/Account", options)
        const data = await response.json()
        console.log(data)
      } catch (err) {
        console.error({error:err})
      }
    }
    createAccount()
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="number" min="0" step="0.01" value={initialAmount} onChange={handleInitialAmount} />
      <select>
        <option value="GPD">GPD</option>
      </select>
      <input type="submit" />
    </form>
  )
}
