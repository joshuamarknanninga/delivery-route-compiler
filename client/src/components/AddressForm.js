import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';

function AddressForm({ addAddress }) {
  const [address, setAddress] = useState('');

  const handleSubmit = () => {
    if (address.trim()) {
      addAddress({ address, status: 'not_delivered' });
      setAddress('');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        label="Add Address"
        placeholder="Enter delivery address..."
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Button type="submit" primary>
        Add
      </Button>
    </Form>
  );
}

export default AddressForm;
