import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InfoCard, TransactionList } from "../../components";

export default function Home() {
   
    const goTo = useNavigate()
    return (
        <>
            <h1>Well done!</h1>
            <InfoCard/>
            <TransactionList/>
            <h2>🙌</h2>
            <button onClick={() => {
                sessionStorage.removeItem("user")
                sessionStorage.removeItem("token")
                sessionStorage.removeItem("user_id")
                goTo("/login")
            }}>Logout</button>
        </>
    );
}
