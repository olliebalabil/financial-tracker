import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import currencies from "../../../currencies.json"

export default function Register({ setTokenExists, inputValue, setInputValue }) {
  const [passwordValue, setPasswordValue] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [initialAmount, setInitialAmount] = useState(0)
  const [currency, setCurrency] = useState("£")
  const [loading,setLoading] = useState(false)
  const [message,setMessage] = useState("")
  const goTo = useNavigate();



  const handleInput = e => {
    setInputValue(e.target.value)
  }
  const handlePassword = e => {
    setPasswordValue(e.target.value)
  }
  const handlePasswordConfirmation = e => {
    setPasswordConfirmation(e.target.value)
  }
  const handleInitialAmount = e => {
    setInitialAmount(e.target.value)
  }
  const handleCurrency = e => {
    setCurrency(e.target.value)
  }
  const handleSubmit = e => {
    e.preventDefault()
    const login = async (userData) => {
      try {
        const options = {
          method: "POST",
          body: JSON.stringify({
            username: userData.username,
            password: passwordValue
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }
        const response = await fetch("https://financial-tracker-auth.onrender.com/users/login", options)
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const loginData = await response.json()
        if (loginData.authenticated) {
          sessionStorage.setItem("user_id",loginData.user_id)
          sessionStorage.setItem("user", inputValue)
          sessionStorage.setItem("token", loginData.token)
          goTo("/", { replace: true });

        }
      } catch (err) {
        console.error({ error: err })
      } finally {
        setLoading(false)
      }
    }
    const register = async () => {
      try {
        setLoading(true)
        const options = {
          method: "POST",
          body: JSON.stringify({
            username: inputValue,
            password: passwordValue,
            initial_balance: initialAmount,
            current_balance: initialAmount,
            currency: currency
            }),
          headers: {
            "Content-Type": "application/json",
          }
        }
        const response = await fetch("https://financial-tracker-auth.onrender.com/users/register", options)
        if (!response.ok) {
          console.error(response)
          setLoading(false)
          
            console.log("This username is already in use.")
            setMessage("This username is already in use.")
            setTimeout(() => {
              setMessage("")
            }, 2500)
          
        } else {
          const data = await response.json()
          login(data)
        }
      } catch (err) {
        console.error({ error: err })
        setLoading(false)
      }
    }


    if (passwordValue == "" || passwordConfirmation == "" || inputValue == "") {
      setMessage("Ensure all info is given.")
      setTimeout(() => {
        setMessage("")
      }, 2500)
    } else if (passwordValue != passwordConfirmation) {
      setMessage("Passwords don't match.")
      setTimeout(() => {
        setMessage("")
      }, 2500)
      set
    } else {
      register()
      setInputValue("")
      setPasswordValue("")
      setPasswordConfirmation("")
    }

  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleInput}
          value={inputValue}
          placeholder="username"
          autoComplete="off"
          pattern='^[a-zA-Z0-9]+$'
        />
        <span className="validity"></span>
        <p>Usernames must contain only letters and numbers.</p>
        <br />
        <input
          type="password"
          onChange={handlePassword}
          value={passwordValue}
          placeholder="password"
        />
        <br />
        <input
          type="password"
          onChange={handlePasswordConfirmation}
          value={passwordConfirmation}
          placeholder="Confirm password"
        />
        <select name="currency" id="" onChange={handleCurrency}>
          <option value="£">£</option>
          <option value="€">€</option>
          <option value="¥">¥</option>
          <option value="$">$</option>
        </select>
        <input type="number" min="0" step="0.01" value={initialAmount} onChange={handleInitialAmount} />
        <input type="submit" />
      </form>
      <p>{message}</p>
      {loading && <h3>Creating Account...</h3>}
      <NavLink to="/login">Already have an account? Login here</NavLink>
    </>
  )
}


//<div dangerouslySetInnerHTML={{ __html: currencies[key].symbol.default.code }}></div>