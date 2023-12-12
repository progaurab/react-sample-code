
const ExcelJS = require('exceljs');
const moment = require('moment');

// Your API data
const apiData = [
  { "GUT_MATCH":"RETAIL MATCH", "ACCOUNT":"123456789", "DATE":"22/08/2023", "TIME":"19:15:39", "AMOUNT":500, "CASH":0, "CARD_CRN":"123456789", "TRANSFER_BSB":"013132" }
  // ... add more data objects as needed
];

// Create a new workbook and add a worksheet
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('API Data');

// Define columns with headers and formatting
worksheet.columns = [
  { header: 'GUT_MATCH', key: 'GUT_MATCH' },
  { header: 'ACCOUNT', key: 'ACCOUNT', style: { numFmt: '0' } }, // Convert string to number
  { header: 'DATE', key: 'DATE', style: { numFmt: 'DD/MM/YYYY' } }, // Apply date format
  { header: 'TIME', key: 'TIME' },
  { header: 'AMOUNT', key: 'AMOUNT', style: { numFmt: '"$"#,##0.00;[Red]\\("$"#,##0.00\\)' } }, // Add $ symbol
  { header: 'CASH', key: 'CASH', style: { numFmt: '"$"#,##0.00;[Red]\\("$"#,##0.00\\)' } }, // Add $ symbol
  // ... define other columns as needed
];

// Add rows to the worksheet
apiData.forEach(data => {
  // Convert DATE string to date object using moment.js
  const dateObj = moment(data.DATE, 'DD/MM/YYYY').toDate();
  
  // Add row to worksheet
  worksheet.addRow({
    ...data,
    DATE: dateObj,
    ACCOUNT: parseInt(data.ACCOUNT) // Convert ACCOUNT to number
  });
});

// Add filters to the DATE column
worksheet.autoFilter = {
  from: 'C1',
  to: 'C1'
};

// Save the workbook to a file
workbook.xlsx.writeFile('API_Data.xlsx')
  .then(() => {
    console.log('Excel file created successfully!');
  })
  .catch(error => {
    console.error('Error writing to Excel file:', error);
  });
