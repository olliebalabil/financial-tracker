import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes";
import { Home, Login, Register } from "./pages"
import { TransactionProvider } from "./contexts";
import "./App.css";

function App() {
  return (
    
      <TransactionProvider>
      <Routes>
        <Route path="/" element={<ProtectedRoute redirectTo="/login" />}>
          <Route index element={<Home />}></Route>
        </Route>
        <Route path="login" element={<Login />}
        ></Route>
        <Route path="register" element={<Register/>}></Route>
      </Routes>
      </TransactionProvider>
  );
}

export default App;
