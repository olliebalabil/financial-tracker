import React, {useState,useEffect} from 'react'

export default function InfoCard() {
  const [info,setInfo] = useState({})
  useEffect(() => {
    const getAccountData = async () => {
        try {
            const response = await fetch(`https://financial-tracker-auth.onrender.com/users/account/id/${sessionStorage.getItem("user_id")}`)
            if (response.status==200) {
              const data = await response.json()
              console.log(data)
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
      <h1>Balance: {info.current_balance}{info.currency}</h1>
    </div>
  )
}
