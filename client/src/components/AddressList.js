import React from 'react';
import { saveAs } from 'file-saver';
import XLSX from 'xlsx';
import { List, Label, Button } from 'semantic-ui-react';

// Inside the AddressList component
const exportToSpreadsheet = () => {
  const data = addresses.map((addr, index) => ({
    Number: index + 1,
    Address: addr.address,
    Status: addr.status
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  
  // Apply color coding
  addresses.forEach((addr, index) => {
    const cell = `C${index + 2}`; // Assuming header is in row 1
    if (addr.status === 'delivered') {
      worksheet[cell].s = { fill: { fgColor: { rgb: "00FF00" } } }; // Green
    } else if (addr.status === 'not_delivered') {
      worksheet[cell].s = { fill: { fgColor: { rgb: "FF0000" } } }; // Red
    } else if (addr.status === 'left_notice') {
      worksheet[cell].s = { fill: { fgColor: { rgb: "FFFF00" } } }; // Yellow
    }
  });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Addresses");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const dataBlob = new Blob([excelBuffer], {type: "application/octet-stream"});
  saveAs(dataBlob, "addresses.xlsx");
};

function AddressList({ addresses, markAsDelivered }) {
  return (
    <List divided relaxed>
      {addresses.map((addr, index) => (
        <List.Item key={addr.id}>
          <List.Content floated='right'>
            {addr.status === 'not_delivered' && (
              <Button onClick={() => markAsDelivered(addr.id)} color='green' size='small'>
                Delivered
              </Button>
            )}
          </List.Content>
          <List.Content>
            <Label color={
              addr.status === 'delivered' ? 'green' :
              addr.status === 'left_notice' ? 'yellow' : 'red'
            }>
              {index + 1}
            </Label>
            {addr.address}
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
}

export default AddressList;
