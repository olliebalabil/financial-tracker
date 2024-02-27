import React, { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../../contexts";

export default function Login() {
  const goTo = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const { setUser, user } = useAuth();
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
        console.log(inputValue, passwordValue)
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
        console.log(data)
        if (data.authenticated) {
          setUser([inputValue,data.token])
          sessionStorage.setItem("user",inputValue)
          sessionStorage.setItem("token",data.token)
          goTo("/", {replace:true});
        }
      } catch (err) {
        console.error({ error: err })
      }
    }
    login()
    setInputValue("")
    setPasswordValue("")
    console.log("here")
  }

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (

    <>
      <form onSubmit={handleSubmit}>
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
      </form>
      <NavLink to="/register">Don't have an account? Create an account here</NavLink>
    </>
  );
}
