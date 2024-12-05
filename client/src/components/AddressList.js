// client/src/components/AddressList.js

import React from 'react';
import { List, Label, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

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

AddressList.propTypes = {
  addresses: PropTypes.array.isRequired,
  markAsDelivered: PropTypes.func.isRequired,
};

export default AddressList;
