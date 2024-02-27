import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from "../../contexts";

export default function Register({ setTokenExists, inputValue, setInputValue }) {
  const [passwordValue, setPasswordValue] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const { setUser, user } = useAuth();


  const handleInput = e => {
    setInputValue(e.target.value)
  }
  const handlePassword = e => {
    setPasswordValue(e.target.value)
  }
  const handlePasswordConfirmation = e => {
    setPasswordConfirmation(e.target.value)
  }
  const handleSubmit = e => {
    e.preventDefault()
    const login = async (userData) => {
      try {
        console.log(inputValue, passwordValue)
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
          console.log(response.json())
          throw new Error("Network response was not ok");
        }
        const loginData = await response.json()
        console.log(loginData)
        if (loginData.authenticated) {
          setUser([inputValue, loginData.token])
          sessionStorage.setItem("user", inputValue)
          sessionStorage.setItem("token", loginData.token)
          setTokenExists(true)
        }
      } catch (err) {
        console.error({ error: err })
      }
    }
    const register = async () => {
      try {
        const options = {
          method: "POST",
          body: JSON.stringify({
            username: inputValue,
            password: passwordValue
          }),
          headers: {
            "Content-Type": "application/json",
          }
        }
        const response = await fetch("https://financial-tracker-auth.onrender.com/users/register", options)
        if (!response.ok) {
          console.error(response)
          if (response.error=='duplicate key value violates unique constraint "users_username_key"') {
            console.log("This username is already in use.")
          }
        } else {
          const data = await response.json()
          console.log(data)
          login(data)
        }
      } catch (err) {
        console.error({ error: err })
      }
    }


    if (passwordValue == "" || passwordConfirmation == "" || inputValue == "") {
      console.log("Ensure a username and password has been given.")
    } else if (passwordValue != passwordConfirmation) {
      console.log("passwords don't match")
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
        <input type="submit" />
      </form>
      <NavLink to="/login">Already have an account? Login here</NavLink>
    </>
  )
}
