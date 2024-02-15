```javascript

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
