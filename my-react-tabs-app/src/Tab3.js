import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
});

const initialValues = {
  name: "",
};

const Tab3 = () => {
  const [inputValue, setInputValue] = useState("");
  const sampleString = "This is a sample string with a ";
  const linkedWord = "link";

  const handleSubmit = (values) => {
    // Handle form submission here
    console.log(values);
  };

  useEffect(() => {
    // Check if there's a linked word in the URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const wordParam = urlParams.get("word");

    if (wordParam) {
      setInputValue(wordParam);
    }
  }, []);

  const handleLinkClick = () => {
    const linkUrl = `tab3?word=${linkedWord}`;
    window.open(linkUrl, "_blank", "noopener noreferrer");
  };

  const displayString = (
    <span>
      {sampleString}
      <span
        style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
        onClick={handleLinkClick}
      >
        {linkedWord}
      </span>
    </span>
  );

  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form>
          <div>
            <p>{displayString}</p>
            <label htmlFor="name">Name</label>
            <Field
              type="text"
              id="name"
              name="name"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div>{formik.errors.name}</div>
          </div>

          <div>
            <button type="submit">Submit</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Tab3;
