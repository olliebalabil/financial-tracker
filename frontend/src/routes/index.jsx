import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ redirectTo }) {

    return sessionStorage.getItem("token") ? <Outlet /> : <Navigate to={redirectTo} />;
}
