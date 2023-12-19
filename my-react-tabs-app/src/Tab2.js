// Tab2.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// const dataArray = [
//   {
//     id: 1,
//     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing gaurab elit.',
//   },
//   {
//     id: 2,
//     text: 'Fusce suscipit, libero et lacinia efficitur, gaurab velit erat facilisis nisi.',
//   },
//   {
//     id: 3,
//     text: 'Pellentesque gaurab habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
//   },
// ];

function Tab2() {
  const navigate = useNavigate();
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // const openNewTab = (word) => {
  //   const newTabUrl = `/tab2?input=${word}`;
  //   navigate(newTabUrl, { target: '_blank' });
  // };

  const renderTextWithLinks = () => {
    // ...
  };

  return (
    <div>
      <h2>Tab 2</h2>
      <div>
        <label htmlFor="input">Input:</label>
        <input
          type="text"
          id="input"
          value={input}
          onChange={handleInputChange}
        />
      </div>
      <ul>
        {renderTextWithLinks()}
      </ul>
    </div>
  );
}

export default Tab2;
