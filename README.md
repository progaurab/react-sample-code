
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { Tab, Tabs } from 'react-bootstrap';
import TTT from './components/TTT';
import ULTRON from './components/ULTRON';
import TTTCACHE from './components/TTTCACHE';

function useActiveTab() {
  const [activeTab, setActiveTab] = useState('');
  useEffect(() => {
    const hash = window.location.hash;
    const match = hash.match(/#(\w+)?\?activeTab=(\w+)/i);
    if (match && match[2]) {
      setActiveTab(match[2].toLowerCase());
    }
  }, [window.location.href]);

  return activeTab;
}

function App() {
  const activeTab = useActiveTab();
  const navigate = useNavigate();

  useEffect(() => {
    if (!activeTab) {
      navigate("/#TTT?activeTab=TTT", {replace: true});
    }
  }, [activeTab, navigate]);

  return (
    <>
      <Tabs defaultActiveKey={activeTab} id="controlled-tab-example" className="mb-3">
        <Tab eventKey="ttt" title={<NavLink to="/#TTT?activeTab=TTT">TTT</NavLink>}/>
        <Tab eventKey="ultron" title={<NavLink to="/#ULTRON?activeTab=ULTRON">ULTRON</NavLink>}/>
        <Tab eventKey="tttcache" title={<NavLink to="/#TTTCACHE?activeTab=TTTCACHE">TTTCACHE</NavLink>}/>
      </Tabs>

      <Routes>
        <Route path="/ttt" element={<TTT />} />
        <Route path="/ultron" element={<ULTRON />} />
        <Route path="/tttcache" element={<TTTCACHE />} />
      </Routes>
    </>
  );
}

export default App;



//-------------------

// Import necessary libraries and components
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // You may need to install axios using npm install axios

// Define your main component
const YourPage = () => {
  // State for the first dropdown
  const [firstDropdownOptions, setFirstDropdownOptions] = useState([]);
  const [selectedFirstOption, setSelectedFirstOption] = useState('');

  // State for the second dropdown
  const [secondDropdownOptions, setSecondDropdownOptions] = useState([]);
  const [selectedSecondOption, setSelectedSecondOption] = useState('');

  // State for the table data
  const [tableData, setTableData] = useState([]);

  // Effect to fetch data for the first dropdown on component mount
  useEffect(() => {
    // Make API call to fetch data for the first dropdown
    // Replace 'your-api-endpoint' with your actual API endpoint
    axios.get('your-api-endpoint-for-first-dropdown')
      .then(response => {
        setFirstDropdownOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching data for the first dropdown', error);
      });
  }, []);

  // Effect to fetch data for the second dropdown when the first dropdown selection changes
  useEffect(() => {
    if (selectedFirstOption) {
      // Make API call to fetch data for the second dropdown based on the selected item from the first dropdown
      // Replace 'your-api-endpoint' with your actual API endpoint
      axios.get(`your-api-endpoint-for-second-dropdown?selectedItem=${selectedFirstOption}`)
        .then(response => {
          setSecondDropdownOptions(response.data);
        })
        .catch(error => {
          console.error('Error fetching data for the second dropdown', error);
        });
    }
  }, [selectedFirstOption]);

  // Function to handle the trace button click
  const handleTraceButtonClick = () => {
    // Make API call to fetch data for the table based on the selected options
    // Replace 'your-api-endpoint' with your actual API endpoint
    axios.get(`your-api-endpoint-for-table-data?firstOption=${selectedFirstOption}&secondOption=${selectedSecondOption}`)
      .then(response => {
        setTableData(response.data);
      })
      .catch(error => {
        console.error('Error fetching table data', error);
      });
  };

  // Function to handle the export to excel button click
  const handleExportToExcelButtonClick = () => {
    // Implement export to excel functionality here
    console.log('Export to Excel clicked');
  };

  return (
    <div>
      {/* First Dropdown */}
      <select value={selectedFirstOption} onChange={(e) => setSelectedFirstOption(e.target.value)}>
        <option value="">Select Option</option>
        {firstDropdownOptions.map(option => (
          <option key={option.id} value={option.value}>{option.label}</option>
        ))}
      </select>

      {/* Second Dropdown */}
      <select value={selectedSecondOption} onChange={(e) => setSelectedSecondOption(e.target.value)}>
        <option value="">Select Option</option>
        {secondDropdownOptions.map(option => (
          <option key={option.id} value={option.value}>{option.label}</option>
        ))}
      </select>

      {/* Trace and Export Buttons */}
      <button onClick={handleTraceButtonClick}>Trace</button>
      <button onClick={handleExportToExcelButtonClick}>Export to Excel</button>

      {/* Display Summary */}
      {/* Implement your summary display logic here */}

      {/* Display Table */}
      <table>
        {/* Implement your table header */}
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        {/* Implement your table body */}
        <tbody>
          {tableData.map(row => (
            <tr key={row.id}>
              <td>{row.column1}</td>
              <td>{row.column2}</td>
              {/* Add more cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default YourPage;
