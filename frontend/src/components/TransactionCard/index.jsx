import React from 'react'

export default function TransactionCard({transaction}) {
  return (
    <div key={transaction.transaction_id}>
          <h1>{transaction.reference}</h1>
          <h2>{transaction.amount}</h2>
          <h2>{transaction.category}</h2>
        </div>
  )
}
