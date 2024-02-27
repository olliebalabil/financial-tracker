import React, {useEffect,useState} from 'react'
import { Register, InitialAccountForm } from '../../components'

export default function RegisterPage() {
  const [tokenExists,setTokenExists] = useState(false)
  const [inputValue, setInputValue] = useState("")

  useEffect(()=>{
    if (sessionStorage.getItem("token")) {
      setTokenExists(true)
    } else {
      setTokenExists(false)
    }
  },[sessionStorage.getItem("token")])
  return (!tokenExists ?
    <Register setTokenExists={setTokenExists} inputValue={inputValue} setInputValue={setInputValue}/> : <InitialAccountForm inputValue/>)
}
