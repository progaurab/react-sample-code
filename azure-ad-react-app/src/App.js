import React from "react";
import { BrowserRouter as Router, Routes ,Route, NavLink } from 'react-router-dom';
import { Tab, Tabs } from "react-bootstrap";
import { useMsal, useIsAuthenticated } from '@azure/msal-react';

import SignInButton from './components/SignInButton';
import SignOutButton from './components/SignOutButton';
import TTT from './components/TTT';
import ULTRON from './components/ULTRON';
import TTTCACHE from './components/TTTCACHE';


function App() {
  const isAuthenticated = useIsAuthenticated();
  const { accounts } = useMsal();
  const userGroups = accounts[0] && accounts[0].idTokenClaims['groups'];

  const hasAccess = (groupName) => {
    return userGroups && userGroups.includes(groupName);
  };

  return (
    <Router>
      {isAuthenticated ? <SignOutButton /> : <SignInButton />}

      <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="ttt" title="TTT">
          <NavLink to="/ttt">TTT</NavLink>
        </Tab>
        <Tab eventKey="ultron" title="ULTRON">
          <NavLink to="/ultron">ULTRON</NavLink>
        </Tab>
        <Tab eventKey="tttcache" title="TTTCACHE">
          <NavLink to="/tttcache">TTTCACHE</NavLink>
        </Tab>
      </Tabs>


{/*
          {hasAccess('ttt-azure-group') ? <TTT /> : <div>Access Denied</div>}
          {hasAccess('ultron-azure-group') ? <ULTRON /> : <div>Access Denied</div>}
          {hasAccess('tttcache-azure-group') ? <TTTCACHE /> : <div>Access Denied</div>}
*/}

      <Routes>
        <Route path="/ttt">
          {hasAccess('ttt-azure-group') ? <TTT /> : <div>Access Denied</div>}
        </Route>
        <Route path="/ultron">
            <ULTRON />
        </Route>
        <Route path="/tttcache">
          <TTTCACHE />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
