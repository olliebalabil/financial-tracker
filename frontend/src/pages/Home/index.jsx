import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InfoCard, TransactionList, TransactionForm } from "../../components";

export default function Home() {

    return (
        <>
            
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
