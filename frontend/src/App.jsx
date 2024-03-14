import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes";
import { Home, Login, Register } from "./pages"
import { TransactionProvider, BalanceProvider } from "./contexts";
import {Header} from "./components"
import "./App.css";

function App() {
  return (

    <TransactionProvider>
      <BalanceProvider>
        <Header/>
        <Routes>
          <Route path="/" element={<ProtectedRoute redirectTo="/login" />}>
            <Route index element={<Home />}></Route>
          </Route>
          <Route path="login" element={<Login />}
          ></Route>
          <Route path="register" element={<Register />}></Route>
        </Routes>
      </BalanceProvider>
    </TransactionProvider>
  );
}

export default App;
