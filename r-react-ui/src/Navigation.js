import React, { useEffect, useState } from 'react';

import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import TTT from "./components/TTT";
import ULTRON from "./components/ULTRON";
import TTTCache from "./components/TTTCache";
import "./Navigation.css";

import authService from './authService';
const { login, logout, getToken } = authService;

const Navigation = () => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      setAccessToken(token);
    };

    fetchData();
  }, []);

  const isAuthenticated = !!accessToken;

  useEffect(() => {
    const accounts = authService.msalInstance.getAllAccounts();
    if (accounts.length === 0) {
      // User is not logged in, prompt them to sign in
      authService.login();
      return;
    }

    if (accounts.length > 1) {
      // User has multiple accounts, set the active account
      authService.msalInstance.setActiveAccount(accounts[0]);
    }
  });

  return (
    <div className="navbar">
      <nav>
        <ul>
          <li>
            <NavLink to="/TTT" className={({ isActive }) => (isActive ? "active" : "")}>
              TTT
            </NavLink>
          </li>
          <li>
            <NavLink to="/ULTRON" className={({ isActive }) => (isActive ? "active" : "")}>
              ULTRON
            </NavLink>
          </li>
          <li>
            <NavLink to="/TTTCache" className={({ isActive }) => (isActive ? "active" : "")}>
              TTTCache
            </NavLink>
          </li>
          {isAuthenticated ? (
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          ) : (
            <li>
              <button onClick={login}>Login</button>
            </li>
          )}
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/TTT" />} />
        <Route  path="/TTT" element={isAuthenticated ? <TTT /> : <div>Unauthorized</div>} />
        <Route  path="/ULTRON" element={isAuthenticated ? <ULTRON /> : <div>Unauthorized</div>} />
        <Route path="/TTTCache" element={isAuthenticated ? <TTTCache /> : <div>Unauthorized</div>} />
      </Routes>
    </div>
  );
};

export default Navigation;
