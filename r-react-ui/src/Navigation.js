// Navigation.js
import React, { useEffect, useState } from 'react';
import { login, logout, getToken } from './authService';
import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import TTT from "./components/TTT";
import ULTRON from "./components/ULTRON";
import TTTCache from "./components/TTTCache";
import "./Navigation.css";

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

  return (
    <div className="navbar">
      <nav>
        <ul>
          <li>
            <NavLink to="/TTT" activeClassName="active">
              TTT
            </NavLink>
          </li>
          <li>
            <NavLink to="/ULTRON" activeClassName="active">
              ULTRON
            </NavLink>
          </li>
          <li>
            <NavLink to="/TTTCache" activeClassName="active">
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
