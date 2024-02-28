import React, { useState, useEffect } from 'react'

export default function TransactionList() {
  const [transacitonArray, setTransactionArray] = useState([])
  useEffect(() => {
    const getAccountData = async () => {
      try {
        const response = await fetch(`https://financial-tracker-auth.onrender.com/transaction/transactions/${sessionStorage.getItem("user_id")}`)
        if (response.status == 200) {
          const data = await response.json()
          console.log(data)
          setTransactionArray(data)
        }

      } catch (err) {
        console.error({ error: err })
      }
    }
    getAccountData()
  }, [sessionStorage.getItem("user_id")])
  return (
    <div className='transaction-list'>
      {transacitonArray.map((t) =>
        <div key={t.tranaction_id}>
          <h1>{t.reference}</h1>
          <h2>{t.amount}</h2>
          <h2>{t.category}</h2>
        </div>
      )}
    </div>
  )
}
