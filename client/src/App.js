import React, { useState, useEffect } from 'react';
import { Container, Header, Button } from 'semantic-ui-react';
import AddressForm from './components/AddressForm';
import AddressList from './components/AddressList';
import RouteMap from './components/RouteMap';
import VoiceCommands from './components/VoiceCommands';
import api from './services/api';

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
    // Implement export functionality using XLSX
  };

  return (
    <Container>
      <Header as="h2">Delivery Route Compiler</Header>
      <AddressForm addAddress={addAddress} />
      <Button onClick={optimizeRoute} primary>
        Optimize Route
      </Button>
      <Button onClick={exportToSpreadsheet} secondary>
        Export to Spreadsheet
      </Button>
      <AddressList 
        addresses={optimizedRoute.length ? optimizedRoute : addresses} 
        markAsDelivered={markAsDelivered} 
      />
      <RouteMap addresses={optimizedRoute.length ? optimizedRoute : addresses} />
      <VoiceCommands addAddress={addAddress} markAsDelivered={markAsDelivered} />
    </Container>
  );
}

export default App;
