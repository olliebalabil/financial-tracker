import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    useEffect(() => {
        const getAccountData = async () => {
            try {
                const options = {

                }
                const response = await fetch()
            } catch (err) {
                console.error({ error: err })
            }
        }
        //getData()
    }, [])
    const goTo = useNavigate()
    return (
        <>
            <h1>Well done!</h1>
            <h2>You made it!</h2>
            <h2>🙌</h2>
            <button onClick={() => {
                sessionStorage.removeItem("user")
                sessionStorage.removeItem("token")
                goTo("/login")
            }}>Logout</button>
        </>
    );
}
