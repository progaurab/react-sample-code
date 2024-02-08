```javascript
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
