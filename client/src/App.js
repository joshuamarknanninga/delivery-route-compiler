import React, { useState, useEffect } from 'react';
import { Container, Header, Button } from 'semantic-ui-react';
import AddressForm from './components/AddressForm';
import AddressList from './components/AddressList';
import RouteMap from './components/RouteMap';
import VoiceCommands from './components/VoiceCommands';
import api from './services/api';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

function App() {
  const [addresses, setAddresses] = useState([]);
  const [optimizedRoute, setOptimizedRoute] = useState([]);

  useEffect(() => {
    // Fetch initial data if necessary
  }, []);

  const addAddress = async (address) => {
    const response = await api.addAddress(address);
    setAddresses([...addresses, response.data]);
  };

  const optimizeRoute = async () => {
    const response = await api.optimizeRoute(addresses);
    setOptimizedRoute(response.data);
    
  };

  const markAsDelivered = async (id) => {
    const updated = addresses.map(addr => 
      addr.id === id ? { ...addr, status: 'delivered' } : addr
    );
    setAddresses(updated);
    await api.updateAddress(id, { status: 'delivered' });
  };

  const exportToSpreadsheet = () => {
    const data = (optimizedRoute.length ? optimizedRoute : addresses).map((addr, index) => ({
      Number: index + 1,
      Address: addr.address,
      Status: addr.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Addresses');

    // Write the workbook to a binary array
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Create a Blob from the binary array
    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    // Save the Blob as a file
    saveAs(dataBlob, 'addresses.xlsx');
  };

  return (
    <Container>
      <Header as="h2">Delivery Route Compiler</Header>
      <AddressForm addAddress={addAddress} />
      <Button onClick={optimizeRoute} primary style={{ marginTop: '10px' }}>
        Optimize Route
      </Button>
      <Button onClick={exportToSpreadsheet} secondary style={{ marginTop: '10px', marginLeft: '10px' }}>
        Export to Spreadsheet
      </Button>
      <AddressList 
        addresses={optimizedRoute.length ? optimizedRoute : addresses} 
        markAsDelivered={markAsDelivered} 
      />
      <RouteMap addresses={optimizedRoute.length ? optimizedRoute : addresses} />
      <VoiceCommands 
        addAddress={addAddress} 
        markAsDelivered={markAsDelivered} 
        addresses={addresses} 
      />
    </Container>
  );
}

export default App;
