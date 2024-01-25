import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { useLocation, useNavigate, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tab2 from './Tab2';
import Tab3 from './Tab3';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabSelect = (key) => {
    setActiveTab(key);
    navigate(`/tab/${key}`);
  };

  useEffect(() => {
    const activeTabParam = location.pathname.split('/')[2];
    if (activeTabParam) {
      setActiveTab(activeTabParam);
    }
  }, [location]);

  return (
    <Tabs
      activeKey={activeTab}
      id="controlled-tab-example"
      onSelect={handleTabSelect}
    >
      <Tab eventKey="tab1" title="Tab 1">
        Tab 1 Content
      </Tab>
      <Tab eventKey="tab2" title="Tab 2">
        <Routes>
          <Route path="/tab/tab2" element={<Tab2 />} />
        </Routes>
      </Tab>
      <Tab eventKey="tab3" title="Tab 3">
        <Routes>
          <Route path="/tab/tab3" element={<Tab3 />} />
        </Routes>
      </Tab>
    </Tabs>
  );
}

export default App;
