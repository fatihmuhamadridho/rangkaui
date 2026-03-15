import { Button } from '@rangkaui/alpha';
import React from 'react';

const HomePage = () => {
  return (
    <div>
      <Button
        size="lg"
        onClick={() => {
          window.alert('@rangkaui/alpha Button is working');
        }}
      >
        Try Alpha Button awdada
      </Button>
    </div>
  );
};

export default HomePage;
