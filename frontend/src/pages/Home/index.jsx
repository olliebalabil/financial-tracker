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
            }} className="logout">Logout</button>
            <div className="components">
                <TransactionList />
                <div className="info-form">
                    <InfoCard />
                    <TransactionForm />
                </div>
            </div>

        </>
    );
}
