```javascript
  import React, { useState } from 'react';
import { Table, Form } from 'react-bootstrap';

const DaTable = ({ data, setSelectedRows }) => {
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Toggle selection for all rows
  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedRowIds([]);
      setSelectedRows([]); // Notify parent component
    } else {
      const allIds = data.map((_, index) => index + 1); // Using index + 1 as id
      setSelectedRowIds(allIds);
      setSelectedRows(allIds); // Notify parent component
    }
    setSelectAll(!selectAll);
  };

  // Toggle selection for individual rows
  const handleRowCheckboxChange = (id) => {
    const newSelectedRowIds = selectedRowIds.includes(id)
      ? selectedRowIds.filter(rowId => rowId !== id)
      : [...selectedRowIds, id];

    setSelectedRowIds(newSelectedRowIds);
    setSelectedRows(newSelectedRowIds); // Notify parent component

    // Adjust 'selectAll' based on current selection
    setSelectAll(newSelectedRowIds.length === data.length);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>
            <Form.Check
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAllChange}
            />
          </th>
          <th>Col1</th><th>Col2</th><th>Col3</th><th>Col4</th><th>Col5</th><th>Col6</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>
              <Form.Check
                type="checkbox"
                checked={selectedRowIds.includes(index + 1)} // Using index + 1 to match id
                onChange={() => handleRowCheckboxChange(index + 1)} // Using index + 1 as id
              />
            </td>
            <td>{row.col1}</td>
            <td>{row.col2}</td>
            <td>{row.col3}</td>
            <td>{row.col4}</td>
            <td>{row.col5}</td>
            <td>{row.col6}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DaTable;

```


```javascript
import React, { useState } from 'react';
import DaTable from './DaTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

const App = () => {
  const tableData =[
    [
      { col1: 'NData1', col2: 'NData1', col3: 'NData1', col4: 'NData1', col5: 'NData1', col6: 'NData1' },
      { col1: 'NData2', col2: 'NData2', col3: 'NData2', col4: 'NData2', col5: 'NData2', col6: 'NData2' },
      { col1: 'NData3', col2: 'NData3', col3: 'NData3', col4: 'NData3', col5: 'NData3', col6: 'NData3' },
      { col1: 'NData4', col2: 'NData4', col3: 'NData4', col4: 'NData4', col5: 'NData4', col6: 'NData4' },
      { col1: 'NData5', col2: 'NData5', col3: 'NData5', col4: 'NData5', col5: 'NData5', col6: 'NData5' },
    ],
    [
      { col1: 'PData1', col2: 'PData1', col3: 'PData1', col4: 'PData1', col5: 'PData1', col6: 'PData1' },
      { col1: 'PData2', col2: 'PData2', col3: 'PData2', col4: 'PData2', col5: 'PData2', col6: 'PData2' },
      { col1: 'PData3', col2: 'PData3', col3: 'PData3', col4: 'PData3', col5: 'PData3', col6: 'PData3' },
      { col1: 'PData4', col2: 'PData4', col3: 'PData4', col4: 'PData4', col5: 'PData4', col6: 'PData4' },
      { col1: 'PData5', col2: 'PData5', col3: 'PData5', col4: 'PData5', col5: 'PData5', col6: 'PData5' },
    ]
]

  const [selectedNonPersonalRows, setSelectedNonPersonalRows] = useState([]);
  const [selectedPersonalRows, setSelectedPersonalRows] = useState([]);

  const logSelectedRowsData = () => {
    let selectedData = [];

    // Log selected Non-Personal Data
    if (selectedNonPersonalRows.length) {
      selectedData.push(tableData[0].filter((_, index) => selectedNonPersonalRows.includes(index + 1)).map(item => item.col1));
    } else {
      selectedData.push([]);
    }

    // Log selected Personal Data
    if (selectedPersonalRows.length) {
      selectedData.push(tableData[1].filter((_, index) => selectedPersonalRows.includes(index + 1)).map(item => item.col1));
    } else {
      selectedData.push([]);
    }

    console.log(selectedData);
  };

  return (
    <div className="App">
      <h2>Non Personal</h2>
      <DaTable data={tableData[0]} setSelectedRows={setSelectedNonPersonalRows} />
      <h2>Personal</h2>
      <DaTable data={tableData[1]} setSelectedRows={setSelectedPersonalRows} />
      <Button onClick={logSelectedRowsData} variant="primary" className="mt-3">Log Selected Data</Button>
    </div>
  );
};

export default App;


```








# ========================================= ******** =========================================
```javascript


const App = () => {
  const tableData = [
    { id: 1, col1: 'Data 1-1', col2: 'Data 1-2', col3: 'Data 1-3', col4: 'Data 1-4', col5: 'Data 1-5', col6: 'Data 1-6' },
    { id: 2, col1: 'Data 2-1', col2: 'Data 2-2', col3: 'Data 2-3', col4: 'Data 2-4', col5: 'Data 2-5', col6: 'Data 2-6' },
    { id: 3, col1: 'Data 3-1', col2: 'Data 3-2', col3: 'Data 3-3', col4: 'Data 3-4', col5: 'Data 3-5', col6: 'Data 3-6' },
    { id: 4, col1: 'Data 4-1', col2: 'Data 4-2', col3: 'Data 4-3', col4: 'Data 4-4', col5: 'Data 4-5', col6: 'Data 4-6' },
    { id: 5, col1: 'Data 5-1', col2: 'Data 5-2', col3: 'Data 5-3', col4: 'Data 5-4', col5: 'Data 5-5', col6: 'Data 5-6' },
  ];

  const [selectedRowIds, setSelectedRowIds] = useState([]);

  // Function to handle selected rows from DaTable
  const handleSelectedRowsChange = (selectedIds) => {
    setSelectedRowIds(selectedIds);
  };

  // Function triggered by the button to log specific column data based on selected rows
  const logSelectedData = () => {
    if (selectedRowIds.length === tableData.length) {
      let selectedAcc = tableData.map(item => item.col1).join(', ');
      console.log('selectedAcc: ', selectedAcc);
    } else {
        let aa1 = [];
        selectedRowIds.forEach(rowId => {
          const row = tableData.find(item => item.id === rowId);
          aa1.push(row);
        });
        
          let selectedAcc = aa1.map(item => item.col1).join(', ');
          console.log('selectedAcc: ', selectedAcc);  
    }
  };

  return (
    <div className="App">
      <DaTable data={tableData} onSelectedRowsChange={handleSelectedRowsChange} />
      <Button onClick={logSelectedData} variant="primary" className="mt-3">Log Selected Data</Button>
    </div>
  );

///================
import React, { useState } from 'react';
import { Table, Form } from 'react-bootstrap';

const DaTable = ({ data, onSelectedRowsChange }) => {
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const toggleSelectAll = (isSelectAll) => {
    if (isSelectAll) {
      const allIds = data.map(item => item.id);
      setSelectedRowIds(allIds);
      onSelectedRowsChange(allIds);
    } else {
      setSelectedRowIds([]);
      onSelectedRowsChange([]);
    }
  };

  const handleSelectAllChange = () => {
    const isCurrentlySelectedAll = selectedRowIds.length === data.length;
    toggleSelectAll(!isCurrentlySelectedAll);
  };

  const handleRowCheckboxChange = (id) => {
    const newSelectedRowIds = selectedRowIds.includes(id) ?
      selectedRowIds.filter(rowId => rowId !== id) :
      [...selectedRowIds, id];
    setSelectedRowIds(newSelectedRowIds);
    onSelectedRowsChange(newSelectedRowIds);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>
            <Form.Check
              type="checkbox"
              checked={selectedRowIds.length === data.length}
              onChange={handleSelectAllChange}
            />
          </th>
          <th>Column 1</th>
          <th>Column 2</th>
          <th>Column 3</th>
          <th>Column 4</th>
          <th>Column 5</th>
          <th>Column 6</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td>
              <Form.Check
                type="checkbox"
                checked={selectedRowIds.includes(row.id)}
                onChange={() => handleRowCheckboxChange(row.id)}
              />
            </td>
            <td>{row.col1}</td>
            <td>{row.col2}</td>
            <td>{row.col3}</td>
            <td>{row.col4}</td>
            <td>{row.col5}</td>
            <td>{row.col6}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DaTable;









//===========================

import React, { useState, useEffect } from 'react';
import { Table, Form } from 'react-bootstrap';

const DaTable = ({ data, setSelectedRows }) => {
  const [selectAll, setSelectAll] = useState(false);

  // State to track selected rows by ID, initialized based on parent state to keep in sync
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  // Handle "Select All" checkbox changes
  const handleSelectAllChange = () => {
    if (!selectAll) {
      // Select all rows
      const allRowIds = data.map(item => item.id);
      setSelectedRowIds(allRowIds); // Update local state
      setSelectedRows(allRowIds); // Update parent state
    } else {
      // Deselect all rows
      setSelectedRowIds([]); // Update local state
      setSelectedRows([]); // Update parent state
    }
    setSelectAll(!selectAll);
  };

  // Handle individual row checkbox changes
  const handleCheckboxChange = (id) => {
    let newSelectedRowIds;
    if (selectedRowIds.includes(id)) {
      // If already selected, remove it from the selection
      newSelectedRowIds = selectedRowIds.filter(rowId => rowId !== id);
    } else {
      // If not selected, add it to the selection
      newSelectedRowIds = [...selectedRowIds, id];
    }
    setSelectedRowIds(newSelectedRowIds); // Update local state
    setSelectedRows(newSelectedRowIds); // Update parent state
    
    // Adjust 'selectAll' if manually selected/deselected every row
    setSelectAll(newSelectedRowIds.length === data.length);
  };

  // Effect to ensure 'selectAll' is correct based on individual selections
  useEffect(() => {
    if (selectedRowIds.length !== data.length) {
      setSelectAll(false);
    } else if (selectedRowIds.length === data.length) {
      setSelectAll(true);
    }
  }, [selectedRowIds, data.length]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>
            <Form.Check
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAllChange}
            />
          </th>
          <th>Column 1</th>
          <th>Column 2</th>
          <th>Column 3</th>
          <th>Column 4</th>
          <th>Column 5</th>
          <th>Column 6</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td>
              <Form.Check
                type="checkbox"
                checked={selectedRowIds.includes(row.id)}
                onChange={() => handleCheckboxChange(row.id)}
              />
            </td>
            <td>{row.col1}</td>
            <td>{row.col2}</td>
            <td>{row.col3}</td>
            <td>{row.col4}</td>
            <td>{row.col5}</td>
            <td>{row.col6}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DaTable;


//////----------------------------->
import React, { useState, useEffect } from 'react';
import { Table, Form } from 'react-bootstrap';

const DaTable = ({ data, setSelectedRows }) => {
  const [selectedRowIds, setSelectedRowIds] = useState([]); // State to track selected rows by ID
  const [selectAll, setSelectAll] = useState(false);

  // Handle "Select All" checkbox changes
  const handleSelectAllChange = () => {
    if (!selectAll) {
      // Select all rows
      const allRowIds = data.map(item => item.id);
      setSelectedRowIds(allRowIds);
      setSelectedRows(allRowIds); // Assuming setSelectedRows is used to update parent state
    } else {
      // Deselect all rows
      setSelectedRowIds([]);
      setSelectedRows([]);
    }
    setSelectAll(!selectAll);
  };

  // Handle individual row checkbox changes
  const handleCheckboxChange = (id) => {
    if (selectedRowIds.includes(id)) {
      const newSelectedRowIds = selectedRowIds.filter(rowId => rowId !== id);
      setSelectedRowIds(newSelectedRowIds);
      setSelectedRows(newSelectedRowIds); // Update parent state
    } else {
      const newSelectedRowIds = [...selectedRowIds, id];
      setSelectedRowIds(newSelectedRowIds);
      setSelectedRows(newSelectedRowIds); // Update parent state
    }
  };

  // Effect to sync selectAll state with individual row selections
  useEffect(() => {
    if (selectedRowIds.length === data.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedRowIds, data.length]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>
            <Form.Check
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAllChange}
            />
          </th>
          {/* Table headers */}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td>
              <Form.Check
                type="checkbox"
                checked={selectedRowIds.includes(row.id)}
                onChange={() => handleCheckboxChange(row.id)}
              />
            </td>
            {/* Table row details */}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DaTable;

//%%%%%%
import React, { useState, useEffect } from 'react';
import { Table, Form } from 'react-bootstrap';

const DaTable = ({ data, setSelectedRows }) => {
  const [selectAll, setSelectAll] = useState(false);

  // Function to handle the "Select All" checkbox change
  const handleSelectAllChange = () => {
    if (!selectAll) {
      // If currently not selected, select all
      setSelectedRows(data.map(item => item.id));
    } else {
      // If currently selected, deselect all
      setSelectedRows([]);
    }
    setSelectAll(!selectAll);
  };

  // Function to handle individual row checkbox changes
  const handleCheckboxChange = (id) => {
    if (setSelectedRows.includes(id)) {
      // If the row is already selected, remove it from the selection
      setSelectedRows(setSelectedRows.filter(rowId => rowId !== id));
    } else {
      // If the row is not selected, add it to the selection
      setSelectedRows([...setSelectedRows, id]);
    }
    // If deselecting any row, also ensure selectAll is unchecked
    if (selectAll && setSelectedRows.length !== data.length) {
      setSelectAll(false);
    }
  };

  // Effect to synchronize selectAll state with individual row selections
  useEffect(() => {
    if (setSelectedRows.length === data.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [setSelectedRows, data.length]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>
            <Form.Check
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAllChange}
            />
          </th>
          <th>Column 1</th>
          <th>Column 2</th>
          <th>Column 3</th>
          <th>Column 4</th>
          <th>Column 5</th>
          <th>Column 6</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td>
              <Form.Check
                type="checkbox"
                checked={setSelectedRows.includes(row.id)}
                onChange={() => handleCheckboxChange(row.id)}
              />
            </td>
            <td>{row.col1}</td>
            <td>{row.col2}</td>
            <td>{row.col3}</td>
            <td>{row.col4}</td>
            <td>{row.col5}</td>
            <td>{row.col6}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DaTable;

//??????????

import React, { useState, useEffect } from 'react';
import { Table, Form } from 'react-bootstrap';

const DaTable = ({ data, setSelectedRows }) => {
  const [selectAll, setSelectAll] = useState(false);

  // Initialize an array based on data length for tracking individual row selections
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  useEffect(() => {
    // When selectAll changes, update the selectedRowIds accordingly
    if (selectAll) {
      setSelectedRowIds(data.map(item => item.id));
    } else {
      setSelectedRowIds([]);
    }
  }, [selectAll, data]);

  useEffect(() => {
    // Update the parent component's state whenever selectedRowIds changes
    setSelectedRows(selectedRowIds);
  }, [selectedRowIds, setSelectedRows]);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (id) => {
    if (selectedRowIds.includes(id)) {
      setSelectedRowIds(selectedRowIds.filter(rowId => rowId !== id));
    } else {
      setSelectedRowIds([...selectedRowIds, id]);
    }
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>
            <Form.Check
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAllChange}
            />
          </th>
          <th>Column 1</th>
          <th>Column 2</th>
          <th>Column 3</th>
          <th>Column 4</th>
          <th>Column 5</th>
          <th>Column 6</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td>
              <Form.Check
                type="checkbox"
                checked={selectedRowIds.includes(row.id)}
                onChange={() => handleCheckboxChange(row.id)}
              />
            </td>
            <td>{row.col1}</td>
            <td>{row.col2}</td>
            <td>{row.col3}</td>
            <td>{row.col4}</td>
            <td>{row.col5}</td>
            <td>{row.col6}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DaTable;



//=========================
function formatDateRange(startDate, endDate) {
  // Parse the start and end dates
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Adjust the end date to the last day of the month
  end.setMonth(end.getMonth() + 1);
  end.setDate(0);

  // Create options for formatting the dates
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  // Create Intl.DateTimeFormat instances for formatting
  const startFormatter = new Intl.DateTimeFormat('en-US', options);
  const endFormatter = new Intl.DateTimeFormat('en-US', options);

  // Format the start and end dates
  const formattedStart = startFormatter.format(start);
  const formattedEnd = endFormatter.format(end);

  // Return the formatted date range
  return `${formattedStart} to ${formattedEnd}`;
}

// Example date range
const startDate = '2023-01-01';
const endDate = '2023-03-01';

// Convert and print the formatted date range
console.log(formatDateRange(startDate, endDate));
// Output: "January 1, 2023 to March 31, 2023"










// DropdownComponent.js
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, FloatingLabel } from 'react-bootstrap';
import DaTable from './DaTable'; // Make sure to adjust the import path according to your file structure

const tableData = [
  { id: 1, col1: 'Data 1-1', col2: 'Data 1-2', col3: 'Data 1-3', col4: 'Data 1-4', col5: 'Data 1-5', col6: 'Data 1-6' },
  { id: 2, col1: 'Data 2-1', col2: 'Data 2-2', col3: 'Data 2-3', col4: 'Data 2-4', col5: 'Data 2-5', col6: 'Data 2-6' },
  { id: 3, col1: 'Data 3-1', col2: 'Data 3-2', col3: 'Data 3-3', col4: 'Data 3-4', col5: 'Data 3-5', col6: 'Data 3-6' },
  { id: 4, col1: 'Data 4-1', col2: 'Data 4-2', col3: 'Data 4-3', col4: 'Data 4-4', col5: 'Data 4-5', col6: 'Data 4-6' },
  { id: 5, col1: 'Data 5-1', col2: 'Data 5-2', col3: 'Data 5-3', col4: 'Data 5-4', col5: 'Data 5-5', col6: 'Data 5-6' },
];

const DropdownComponent = () => {
  const [selectedDA, setSelectedDA] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowTable(true);
  };

  const logFilteredData = () => {
    const filteredData = tableData.filter(row => !selectedRows.includes(row.id));
    console.log(filteredData);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <FloatingLabel controlId="dropdownDAName" label="DA Name" className="mb-3">
              <Form.Select aria-label="DA Name" value={selectedDA} onChange={(e) => setSelectedDA(e.target.value)}>
                <option value="">Select DA Name</option>
                {/* Populate options dynamically */}
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="dropdownDateRange" label="Date Range" className="mb-3">
              <Form.Select aria-label="Date Range" value={selectedDateRange} onChange={(e) => setSelectedDateRange(e.target.value)}>
                <option value="">Select Date Range</option>
                {/* Populate options based on selectedDA */}
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>
        <Button type="submit" className="me-2">Submit</Button>
        <Button onClick={logFilteredData} variant="info">Log Filtered Data</Button>
      </Form>

      {showTable && <DaTable data={tableData} setSelectedRows={setSelectedRows} />}
    </Container>
  );
};

export default DropdownComponent;

```

######------------
```javascript
// DaTable.js
import React from 'react';
import { Table, Form } from 'react-bootstrap';

const DaTable = ({ data, setSelectedRows }) => {
  const handleCheckboxChange = (id) => {
    setSelectedRows((prev) => prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th><th>Column 1</th><th>Column 2</th><th>Column 3</th><th>Column 4</th><th>Column 5</th><th>Column 6</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td><Form.Check type="checkbox" onChange={() => handleCheckboxChange(row.id)} /></td>
            <td>{row.col1}</td><td>{row.col2}</td><td>{row.col3}</td><td>{row.col4}</td><td>{row.col5}</td><td>{row.col6}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DaTable;

```


Next, modify the `DropdownComponent` to include the fetch call within the `handleSubmit` function and update the state accordingly. For this example, the `DaTable` component's visibility and the data it displays will be controlled by the state that gets updated upon the successful submission of the form:

import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, FloatingLabel, Accordion } from 'react-bootstrap';
// Import or define DaTable and Hello components here

const DropdownComponent = () => {
  const [selectedDA, setSelectedDA] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('');
  const [showTable, setShowTable] = useState(false); // State to control DaTable visibility
  const [daTableData, setDaTableData] = useState([]); // State to hold the table data

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate a POST fetch call
    const postData = {
      selectedDA,
      selectedDateRange
    };

    console.log('Submitting:', postData);

    // Here, replace the URL with your actual endpoint
    fetch('https://your-api-endpoint.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
    .then(response => response.json())
    .then(data => {
      // Simulate setting the response data (tableData) as the result of the API call
      setDaTableData(tableData);
      setShowTable(true);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          {/* Your dropdowns setup */}
        </Row>
        <Button type="submit">Submit</Button>
      </Form>

      {showTable && (
        <DaTable data={daTableData} />
      )}
    </Container>
  );
};

export default DropdownComponent;


In the `DaTable` component, ensure you modify it to accept `data` as a prop and render the table based on this prop:

const DaTable = ({ data }) => {
  // Your DaTable implementation, utilizing the data prop for table rows
};


**Note:** The `fetch` call in the `handleSubmit` function is simulated to directly set `tableData` as the response data upon submission. In a real application, you'd receive this data from your backend in response to the fetch call. Ensure the endpoint URL and request body structure match what your backend expects.

//-------

To implement the requirements, we'll follow these steps:

1. Define a JSON object with random data for the table.
2. Create the `DaTable` component that renders a table using React Bootstrap, including checkboxes in the first column.
3. Manage which rows are selected using state and filter the JSON data accordingly.
4. Add a button to log the filtered JSON data to the console.

### Step 1: Define the JSON Data for the Table

const tableData = [
  { id: 1, col1: 'Data 1-1', col2: 'Data 1-2', col3: 'Data 1-3', col4: 'Data 1-4', col5: 'Data 1-5', col6: 'Data 1-6' },
  { id: 2, col1: 'Data 2-1', col2: 'Data 2-2', col3: 'Data 2-3', col4: 'Data 2-4', col5: 'Data 2-5', col6: 'Data 2-6' },
  { id: 3, col1: 'Data 3-1', col2: 'Data 3-2', col3: 'Data 3-3', col4: 'Data 3-4', col5: 'Data 3-5', col6: 'Data 3-6' },
  { id: 4, col1: 'Data 4-1', col2: 'Data 4-2', col3: 'Data 4-3', col4: 'Data 4-4', col5: 'Data 4-5', col6: 'Data 4-6' },
  { id: 5, col1: 'Data 5-1', col2: 'Data 5-2', col3: 'Data 5-3', col4: 'Data 5-4', col5: 'Data 5-5', col6: 'Data 5-6' },
];


### Step 2: Create the `DaTable` Component

import React, { useState } from 'react';
import { Table, Form } from 'react-bootstrap';

const DaTable = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedRows(prev => {
      if (prev.includes(id)) {
        return prev.filter(rowId => rowId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th><th>Column 1</th><th>Column 2</th><th>Column 3</th><th>Column 4</th><th>Column 5</th><th>Column 6</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => (
          <tr key={row.id}>
            <td><Form.Check type="checkbox" onChange={() => handleCheckboxChange(row.id)} /></td>
            <td>{row.col1}</td>
            <td>{row.col2}</td>
            <td>{row.col3}</td>
            <td>{row.col4}</td>
            <td>{row.col5}</td>
            <td>{row.col6}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};


### Step 3 & 4: Add Button to Log Filtered JSON and Integrate `DaTable` Component

Add the `DaTable` component to your form and include a new button beside the submit button to log the filtered JSON data:

import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, FloatingLabel, Accordion } from 'react-bootstrap';

// Assuming DaTable is defined/imported

const DropdownComponent = () => {
  // Previous states and functions
  
  const logFilteredData = () => {
    const filteredData = tableData.filter(row => !selectedRows.includes(row.id));
    console.log(filteredData);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          {/* Previous dropdown setup */}
        </Row>
        <Button type="submit" className="me-2">Submit</Button>
        <Button onClick={logFilteredData}>Log Filtered Data</Button>
      </Form>

      {showAccordion && (
        <Accordion defaultActiveKey="0" className="mt-3">
          <Accordion.Item eventKey="0">
            <Accordion.Header>{selectedDateRange || 'Select a date range'}</Accordion.Header>
            <

Accordion.Body>
              <Hello />
              <DaTable />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
    </Container>
  );
};

export default DropdownComponent;


In this setup:
- The `DaTable` component is included in the body of the Accordion, showing the table as specified.
- A new button, "Log Filtered Data," calls `logFilteredData`, which filters `tableData` based on the `selectedRows` and logs the result. This function needs to be adjusted to correctly access `selectedRows` from `DaTable`, which might involve lifting state up or using a context if `selectedRows` is managed within `DaTable`.
- Ensure `selectedRows` state management is accessible in the context where `logFilteredData` is defined. This might require passing `selectedRows` and `setSelectedRows` as props to `DaTable` or managing the state at a higher level in your component tree.

This example outlines a basic implementation. Depending on your application's architecture, you may need to adjust state management and data flow between components.
```

```javascript
//--------

import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, FloatingLabel, Accordion } from 'react-bootstrap';

// Assuming Hello component is defined in the same file or imported
// const Hello = () => { return <div>Hello!</div>; };

const DropdownComponent = () => {
  const [selectedDA, setSelectedDA] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('');
  const [showAccordion, setShowAccordion] = useState(false); // State to control accordion visibility

  const handleDAChange = (e) => {
    setSelectedDA(e.target.value);
    setSelectedDateRange('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAccordion(true); // Show accordion on submit
    console.log(JSON.stringify({ selectedDA, selectedDateRange }));
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          {/* Dropdowns setup as previously described */}
        </Row>
        <Button type="submit">Submit</Button>
      </Form>

      {showAccordion && (
        <Accordion defaultActiveKey="0" className="mt-3">
          <Accordion.Item eventKey="0">
            <Accordion.Header>{selectedDateRange || 'Select a date range'}</Accordion.Header>
            <Accordion.Body>
              <Hello />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
    </Container>
  );
};

export default DropdownComponent;

//--------

<Container>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <FloatingLabel controlId="dropdownDAName" label="DA Name" className="w-100 mb-3">
              <Form.Select aria-label="DA Name" value={selectedDA} onChange={handleDAChange} className="w-100">
                <option value="">Select DA Name</option>
                {data.map((item, index) => (
                  <option key={index} value={item.DA_NAME}>{item.DA_NAME}</option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="dropdownDateRange" label="Date Range" className="w-100 mb-3">
              <Form.Select aria-label="Date Range" value={selectedDateRange} onChange={(e) => setSelectedDateRange(e.target.value)} disabled={!selectedDA} className="w-100">
                <option value="">Select Date Range</option>
                {selectedDA && data.find(item => item.DA_NAME === selectedDA)?.DATE_RANGE.map((range, index) => (
                  <option key={index} value={range}>{range}</option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
//----
const input = [
  {
    "daname": "a",
    "date": "1a"
  },
  {
    "daname": "a",
    "date": "2a"
  },
  {
    "daname": "b",
    "date": "1b"
  },
  {
    "daname": "b",
    "date": "2b"
  }
];

function transformData(data) {
  // Create a map to hold the aggregation
  const map = new Map();

  // Iterate over each item in the input array
  data.forEach(item => {
    // If the daname is already in the map, push the new date into the existing array
    if (map.has(item.daname)) {
      map.get(item.daname).push(item.date);
    } else {
      // Otherwise, create a new array with the current date
      map.set(item.daname, [item.date]);
    }
  });

  // Transform the map back into the desired array structure
  const result = Array.from(map, ([daname, date]) => ({
    daname,
    date
  }));

  return result;
}

const output = transformData(input);
console.log(output);

//---------

import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const data = [
  {
    "DA_NAME": "Sexual Servitude",
    "DATE_RANGE": [
      "2023-07-01 - 2023-09-30",
      "2023-10-01 - 2023-12-31",
      "2023-01-01 - 2023-03-31",
      "2023-04-01 - 2023-06-30"
    ]
  },
  {
    "DA_NAME": "Unregistered Remittance Activity",
    "DATE_RANGE": [
      "2023-07-01 - 2023-09-30",
      "2023-10-01 - 2023-12-31",
      "2023-01-01 - 2023-03-31",
      "2023-04-01 - 2023-06-30"
    ]
  }
];

const DropdownComponent = () => {
  const [selectedDA, setSelectedDA] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('');

  const handleDAChange = (e) => {
    setSelectedDA(e.target.value);
    setSelectedDateRange('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ selectedDA, selectedDateRange }));
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="dropdownDAName">
              <Form.Label>DA Name</Form.Label>
              <Form.Select aria-label="DA Name" value={selectedDA} onChange={handleDAChange}>
                <option value="">Select DA Name</option>
                {data.map((item, index) => (
                  <option key={index} value={item.DA_NAME}>{item.DA_NAME}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="dropdownDateRange">
              <Form.Label>Date Range</Form.Label>
              <Form.Select aria-label="Date Range" value={selectedDateRange} onChange={(e) => setSelectedDateRange(e.target.value)} disabled={!selectedDA}>
                <option value="">Select Date Range</option>
                {selectedDA && data.find(item => item.DA_NAME === selectedDA)?.DATE_RANGE.map((range, index) => (
                  <option key={index} value={range}>{range}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default DropdownComponent;












//---------------
import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import { Container, Row, Col, FloatingLabel } from 'react-bootstrap';

const TadaTab = () => {
  const [dropdownOneOptions, setDropdownOneOptions] = useState([]);
  const [dropdownTwoOptions, setDropdownTwoOptions] = useState([]);
  const [dropdownThreeOptions, setDropdownThreeOptions] = useState([]);

  // Assume this state is somehow set when the TADA tab is selected
  const [isTadaTabSelected, setIsTadaTabSelected] = useState(false);

// Mock fetch functions for demonstration
const fetchDropdownOneData = async () => {
  return [{"DA_NAME": "child 1"}, {"DA_NAME": "child 2"}, {"DA_NAME": "child 3"}];
};

const fetchDropdownTwoData = async (selectionFromDropdownOne) => {
  // Simulate fetching data based on the first dropdown selection
  return [{"DATE_RANGE": "2023-01-01 - 2023-01-31"}, {"DATE_RANGE": "2023-02-01 - 2023-02-28"}];
};

const fetchDropdownThreeData = async (selectionFromDropdownOne, selectionFromDropdownTwo) => {
  // Simulate fetching data based on the first and second dropdown selections
  return [{"CUSTOMER_ID": "9776654"}, {"CUSTOMER_ID": "9776655"}];
};


  useEffect(() => {
    if (isTadaTabSelected) {
      fetchDropdownOneData().then(setDropdownOneOptions);
    }
  }, [isTadaTabSelected]);

  const handleDropdownOneChange = async (selectedOption) => {
    const data = await fetchDropdownTwoData(selectedOption);
    setDropdownTwoOptions(data);
  };

  const handleDropdownTwoChange = async (selectedOptionOne, selectedOptionTwo) => {
    const data = await fetchDropdownThreeData(selectedOptionOne, selectedOptionTwo);
    setDropdownThreeOptions(data);
  };

  return (
    <Container>
      <Formik
        initialValues={{
          dropdownOne: '',
          dropdownTwo: '',
          dropdownThree: ''
        }}
        onSubmit={(values) => {
          console.log(values);
          // Perform the final submission here
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <Row className="mb-3">
              <Col>
                <FloatingLabel label="Dropdown One">
                  <Field as="select" name="dropdownOne" className="form-select"
                    onChange={(e) => {
                      const { value } = e.target;
                      setFieldValue("dropdownOne", value);
                      handleDropdownOneChange(value);
                    }}
                  >
                    <option value="">Select an option</option>
                    {dropdownOneOptions.map((option, index) => (
                      <option key={index} value={option.DA_NAME}>{option.DA_NAME}</option>
                    ))}
                  </Field>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel label="Dropdown Two">
                  <Field as="select" name="dropdownTwo" className="form-select"
                    onChange={(e) => {
                      const { value } = e.target;
                      setFieldValue("dropdownTwo", value);
                      handleDropdownTwoChange(values.dropdownOne, value);
                    }}
                  >
                    <option value="">Select a date range</option>
                    {dropdownTwoOptions.map((option, index) => (
                      <option key={index} value={option.DATE_RANGE}>{option.DATE_RANGE}</option>
                    ))}
                  </Field>
                </FloatingLabel>
              </Col>

              <Col>
                <FloatingLabel label="Dropdown Three">
                  <Field as="select" name="dropdownThree" className="form-select">
                    <option value="">Select a customer ID</option>
                    {dropdownThreeOptions.map((option, index) => (
                      <option key={index} value={option.CUSTOMER_ID}>{option.CUSTOMER_ID}</option>
                    ))}
                  </Field>
                </FloatingLabel>
              </Col>
            </Row>
            {/* Submit Button and other form elements as needed */}
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default TadaTab;

```javascript
