import React from 'react';
import { Pane, Text } from 'evergreen-ui';

const ThankYou = () => {
  return (
    <Pane display="flex" alignItems="center" justifyContent="center" height="100vh">
      <Text fontSize={32}>Thank you for your order!</Text>
    </Pane>
  );
};

export default ThankYou;
