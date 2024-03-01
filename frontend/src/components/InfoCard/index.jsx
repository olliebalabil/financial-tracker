import React, {useState,useEffect} from 'react'
import {useBalance} from "../../contexts"


export default function InfoCard() {
  const {balance,setBalance} = useBalance()
  const [info,setInfo] = useState({})
  useEffect(() => {
    const getAccountData = async () => {
        try {
            const response = await fetch(`https://financial-tracker-auth.onrender.com/users/account/id/${sessionStorage.getItem("user_id")}`)
            if (response.status==200) {
              const data = await response.json()
              console.log(data.current_balance)
              setBalance([data.currency,parseFloat(data.current_balance).toFixed(2)])
              setInfo(data)
            }

        } catch (err) {
            console.error({ error: err })
        }
    }
    getAccountData()
}, [])

  return (

    <div>
      <h1>Balance: {balance[0]}{balance[1]}</h1>
    </div>
  )
}
