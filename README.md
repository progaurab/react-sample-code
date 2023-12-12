
const ExcelJS = require('exceljs');
const moment = require('moment');

const handleDataandExport = async (data, values, columnDefs) => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = `${dd}/${mm}/${yyyy}`;

  if (data && data.length) {
    if (values.searchOption === "accountNumber") {
      const workbook = new ExcelJS.Workbook();
      const sheetName = values.searchValue;
      const worksheet = workbook.addWorksheet(sheetName, {
        views: [{ state: "frozen", ySplit: 1 }],
      });

      const headerRow = columnDefs.map((column) => column.headerName);
      const headerCellStyle = {
        fill: {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "4F81BD" }, // Blue color
        },
        font: {
          bold: true,
          color: { argb: "FFFFFFFF" }, // White color
        },
      };

      const headerRowCell = worksheet.addRow(headerRow);
      headerRowCell.eachCell((cell) => {
        cell.style = headerCellStyle;
      });

      // Apply the dollar sign format only to the 'AMOUNT' and 'CASH' columns
      const amountColumnIndex = columnDefs.findIndex((column) => column.field === "AMOUNT");
      if (amountColumnIndex >= 0) {
        const amountColumn = worksheet.getColumn(amountColumnIndex + 1);
        amountColumn.eachCell((cell, rowNumber) => {
          if (rowNumber > 1) {
            cell.numFmt = '"$"#,##0.00';
          }
        });
      }

      const cashColumnIndex = columnDefs.findIndex((column) => column.field === "CASH");
      if (cashColumnIndex >= 0) {
        const cashColumn = worksheet.getColumn(cashColumnIndex + 1);
        cashColumn.eachCell((cell, rowNumber) => {
          if (rowNumber > 1) {
            cell.numFmt = '"$"#,##0.00';
          }
        });
      }

      // Ensure that other columns do not get the dollar sign format
      worksheet.columns.forEach((column) => {
        if (column.number !== amountColumnIndex + 1 && column.number !== cashColumnIndex + 1) {
          column.eachCell((cell, rowNumber) => {
            if (rowNumber > 1) {
              cell.numFmt = null;
            }
          });
        }
      });

      // Convert the 'DATE' string from the API to a date object using Moment.js
      const dateColumnIndex = columnDefs.findIndex((column) => column.field === "DATE");
      if (dateColumnIndex >= 0) {
        const dateColumn = worksheet.getColumn(dateColumnIndex + 1);
        dateColumn.eachCell((cell, rowNumber) => {
          if (rowNumber > 1) {
            const dateValue = moment(cell.value, "DD/MM/YYYY").toDate();
            if (dateValue.isValid()) {
              cell.value = dateValue;
              cell.numFmt = "dd/mm/yyyy";
            } else {
              console.error(`Invalid date string: ${cell.value}`);
            }
          }
        });
      }

      // Handle the 'TRANSFER_BSB' string correctly
      const transferBsbColumnIndex = columnDefs.findIndex((column) => column.field === "TRANSFER_BSB");
      if (transferBsbColumnIndex >= 0) {
        const transferBsbColumn = worksheet.getColumn(transferBsbColumnIndex + 1);
        transferBsbColumn.eachCell((cell, rowNumber) => {
          if (rowNumber > 1) {
            cell.value = cell.value.trim();
          }
        });
      }

      // ... Rest of the code for populating data ...

      // Set column widths based on the maximum length of data in each column
      worksheet.columns.forEach((column) => {
        let maxLength = 0;
        column.eachCell({ includeEmpty: true }, (cell) => {
          let columnLength = cell.value ? cell.value.toString().length : 10;
          if (columnLength > maxLength) {
            maxLength = columnLength;
          }
        });
        column.width = maxLength < 10 ? 10 : maxLength;
      });

      // ... Rest of the code for exporting the workbook ...
    }
  }
};

// Make sure to pass the actual data, values, and column definitions when calling the function

















===================================




const handleDataandExport async (data, values) =>

const today new Date();

const yyyy= today.getFullYear();

let mm= today.getMonth() + 1; // Months start at el

let dd today.getDate();

if (dd < 10) dd = "0" + dd;

if (mm < 10) mm = "e" + mm;

const formattedToday dd.toString() + mm.tostring() + yyyy;

if (data && data.length) {

if (values.searchoption === "accountNumber")

const workbook new Excels.Workbook();

const sheetName = values.searchValue;

const worksheet workbook.addworksheet(sheetName, (

views: [{ state: "frozen", ySplit: 1 }],

});

const header Row = columnTTTDefs.map((column) => column.headerName);

const headercellStyle = {

fill: (

type: "pattern",

pattern: "solid",

fgcolor: (argb: "4F81BD" }, //blue DCE6F1

},

font: {

bold: true,

color: (argb: "FFFFFFFF" }, //white

},

};

const headerRowCell worksheet.addRow(headerRow); headerRowCell.eachCell((cell) => {

cell.style headerCellStyle;

});

worksheet.autoFilter = (

}; }, column: columnTTTDefs.length,

from: (

row: 1,

column: 1,

to: {

row: 1,

const datacellstyle = {

};

fill: (

type: "pattern",

pattern: "solid",

I

fgcolor: { argb: "ffffff" }, //light blue

data.forEach((row, rowIndex) => {

const dataRow = columnTTTDefs.map((column) => (

const field = column.field;

));

const value = row[field];

return value;

const dataRowCell worksheet.addRow(dataRow); dataRowCell.eachcell((cell) => {

cell.style datacellstyle; });

if (rowIndex % 2 === 0) (

const alternateRowCellstyle {

fill: {

type: "pattern",

pattern: "solid

",


fgcolor: (argb: "C509F1" }, //ROW WHITE

dataRowCell.eachCell((cell) => {

cell.style alternateRowCellstyle;

});

});

const amountColumnIndex columnTTTDefs.findIndex( (column) => column.field === "AMOUNT"

if (amountColumnIndex >= 0) (

const amountColumn = worksheet.getColumn(amountColumnIndex + 1); amountColumn.eachcell((cell) => {

cell.numFmt = "$"#,##0.00";

});

}

const cashColumnIndex columnTTTDefs.findIndex( (column) => column.field "CASH" I

); if (cashColumnIndex >= 0) {

const cashColumn worksheet.getColumn(cashColumnIndex + 1); cashColumn.eachCell((cell) => { cell.numFmt="$"#,##0.00";

});

}

const dateColumnIndex columnTTTDefs.findIndex(

(column) => column.field "DATE"

); if (dateColumnIndex >= 0) {

const dateColumn worksheet.getColumn(dateColumnIndex + 1);

dateColumn.eachCell((includeEmpty: true), (cell, rowNumber) => {

if (rowNumber > 1)(

cell.numFmt = "dd/mm/yyyy"

const dateParts = cell.value.split('/');

const datevalue = new Date("${dateParts[0])/$(dateParts[1])/$(dateParts[2]}'); if(lisNaN(dateValue.getTime())){

cell.value = datevalue;

cell.style = {numFmt:"dd/mm/yyyy"};

));

}

const accountColumnIndex ); (column) => column.field columnTTTDefs.findIndex( "ACCOUNT"

if (accountColumnIndex >= 0) {

const accountColumn worksheet.getColumn(accountColumnIndex + 1); accountColumn.eachcell((cell,rowNumber) => {

if(rowNumber> 1)

});

cell.numFmt = "0";

cell.value = Number(cell.value);


worksheet.columns.forEach((column, i) => {

var maxLength = 0;

column.eachCell((includeEmpty: true), function (cell){

var columnLength = cell.value ? cell.value.toString().length: 10;

if(columnlength > gth > maxLength) {

maxLength columnLength;


});

column.width = maxLength < 107 10: maxLength;

});

000

const createOuterBorder = (worksheet, start (row:1,col:1), end-(row:1, col:1), borderwidth="medium")> (

const borderstyle (

style: borderwidth

for(let i-start.row; i < end.row; i++) (

const topBordercell worksheet.getcell(i, start.col);

const bottomBorderCell worksheet.getCell(i, end.col);

topBordercell.border == (

};

...topBordercell.border,

top: borderstyle

bottomBordercell.border = ( ...bottomBorderCell.border,

bottom:borderStyle

}; const buffer await workbook.xlsx.writeBuffer();

)

const blob new Blob([buffer], ( type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

}); saveAs (blob, values.searchvalue++ formattedToday".xlsx");

if (values.searchoption const workbook new Excells.Workbook(); "customertiumber") (

const sheet Name values.searchValue;

const worksheet workbook.addworksheet (sheetName, ( views: [[state: "frozen", ySplit: 1)],

});

const headerRow columnTTTCustDefs.map((column) -> column.headerName);

const headerCellstyle = (

);

fill: (

},

type: "pattern",

pattern: "solid",

fgcolor: (argb: "4F8180" }, //blue

font: (

bold: true,

color: (argb: "FFFFFFFF" }, //white

const headerRowCell worksheet.addRow(headerRow); header RowCell.eachcell((cell) => (

cell.style headerCellstyle;

worksheet.autoFilter = (

from: (

row: 1,

column: 1,

to: (

row: 1,

column: columnTTTCustDefs.length,

},

};

const datacellstyle (

}; data.forEach((row, rowIndex)>(

fill: (

type: "pattern",

pattern: "solid",

fgColor: argb: "FFFFFF" }, //light 


),

data.forEach((row, rowIndex)>(

const dataRow columnTTTCustDefs.map((column) => (

const field column.field;

const value row[field];

return value;

});

const dataRowCell = worksheet.addRow(dataRow);

dataRowCell.eachCell((cell) => { cell.style datacellstyle;

});

if (rowIndex % 2 == 0) {

} });

const alternateRowCellStyle = {

};

fill: {

type: "pattern",

pattern: "solid",

fgColor: { argb: "C5D9F1" }, //light gray

dataRowCell.eachCell((cell) => {

}); cell.style alternateRowCellstyle;

const amountColumnIndex columnTTTCustDefs.findIndex( (column) => column.field "AMOUNT" );

if (amountColumnIndex >= 0) {

const amountColumn worksheet.getColumn(amountColumnIndex + 1);

amountColumn.eachCell((cell) => {

});

cell.numFmt = "$"#,##0.00";

const cashcolumnIndex columiTTTCustDefs.findIndex( (column) column.field "CASH"

If (cashColumnIndex > 0) (

const cashcolumn worksheet.getColumn(cashColumnIndex + 1); cashcolumn.eachcell((cell)-> ( cell.numfmt"5",##0.00";

const dateColumnIndex columnTTTCustDefs.findIndex( (column) => column.field "DATE"

); if (dateColumnIndex >= 0) {

const dateColumn worksheet.getColumn(dateColumnIndex + 1); datecolumn.eachCell((includeEmpty: true), (cell, rowfiumber) =>

if (rowNumber > 1)(

cell.numFmt "dd/mm/yyyy" const dateparts cell.value.split('/');

const datevalue = new Date("$(dateParts[0])/S(dateParts[1])/$(dateParts[2]}); I

if(lisNaN(dateValue.getTime()))(

cell.value dateValue;

cell.style (numFmt:"dd/mm/yyyy");

}

});

}

const accountColumnIndex columnTTTCustDefs.findIndex( (column) => column.field == "ACCOUNT"

);

if (accountColumnIndex >= 0) {

const accountColumn = worksheet.getColumn(accountColumnIndex + 1); accountColumn.eachcell((cell,rowNumber) => {

if (rowNumber > 1)

cell.numFmt = "0";

celi.value = Number(cell.value);

});

)

I

worksheet.columns.forEach((column, 1) => {

var maxlength = 0;

column.eachCell((includeEmpty: true), function (cell){

});

});

var columnLength cell.value? cell.value.toString().length: 10;

if(columnLength > maxLength) {

}

maxlength columnLength;

column.width maxlength < 107 10 maxlength;

const buffer = await, workbook.xlsx.writeBuffer();

const blob = new Blob([buffer], {

}); type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

saveAs (blob, values.searchvalue + "_" + formattedToday + ".xlsx");
}}}


_____________^^^_________
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
