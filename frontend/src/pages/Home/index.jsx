import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InfoCard, TransactionList, TransactionForm } from "../../components";

export default function Home() {
   
    const goTo = useNavigate()
    return (
        <>
            <button onClick={() => {
                sessionStorage.removeItem("user")
                sessionStorage.removeItem("token")
                sessionStorage.removeItem("user_id")
                goTo("/login")
            }}>Logout</button>
            <div className="content">
            <InfoCard/>
            <TransactionForm/>
            <TransactionList/>
        

            </div>
        </>
    );
}
