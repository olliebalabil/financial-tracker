import React from 'react'
import { useNavigate } from "react-router-dom";

export default function index() {
  const goTo = useNavigate()

  return (
    
    sessionStorage.getItem("token") && <button onClick={() => {
      sessionStorage.removeItem("user")
      sessionStorage.removeItem("token")
      sessionStorage.removeItem("user_id")
      goTo("/login")
  }} className="logout">Logout</button>
    )
}
