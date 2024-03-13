import React, { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";

export default function Login() {
  const goTo = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const inputRef = useRef();

  function handleInput(e) {
    setInputValue(e.target.value);
  }
  function handlePassword(e) {
    setPasswordValue(e.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const login = async () => {
      try {
        setLoading(true)
        const options = {
          method: "POST",
          body: JSON.stringify({
            username: inputValue,
            password: passwordValue
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }
        const response = await fetch("https://financial-tracker-auth.onrender.com/users/login", options)
        const data = await response.json()
        if (data.authenticated) {
          sessionStorage.setItem("user", inputValue)
          sessionStorage.setItem("token", data.token)
          sessionStorage.setItem("user_id", data.user_id)
          goTo("/", { replace: true });
        } else {
          setMessage("Username or password incorrect. Try again")
          setTimeout(() => {
            setMessage("")
          }, 2500)
        }
      } catch (err) {
        console.error({ error: err })
      } finally {
        setLoading(false)
      }
    }
    if (!inputValue) {
      setMessage("Enter your username")
      setTimeout(() => {
        setMessage("")
      }, 2500)
    } else if (!passwordValue) {
      setMessage("Enter your password")
      setTimeout(() => {
        setMessage("")
      }, 2500)
    } else {
      login()
      setInputValue("")
      setPasswordValue("")
    }
  }

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (

    <div className="login">
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          onChange={handleInput}
          value={inputValue}
          placeholder="username"
          autoComplete="off"
          ref={inputRef}
        />
        <br />
        <input
          type="password"
          onChange={handlePassword}
          value={passwordValue}
          placeholder="password"
        />
        <br />
        <input type="submit" />
      <p>{message}</p>
      <NavLink className='link' to="/register">Don't have an account? Create an account here</NavLink>
      {loading && <div className="loading">Loading&#8230;</div>}
      </form>
    </div>
  );
}
