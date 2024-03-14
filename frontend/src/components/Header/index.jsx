import React from "react";
import { Outlet } from "react-router-dom";
import { Logout } from "../../components";

export default function Header() {

  return (
    <div className="header">
      <h1>TrackIt</h1>
      <Logout />
      <Outlet />
    </div>
  )
}