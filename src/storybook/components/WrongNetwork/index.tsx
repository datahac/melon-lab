import React, { StatelessComponent } from 'react';

const WrongNetwork: StatelessComponent = () => (
  <div className="no-connection">
    <h3>Welcome to the future of investment funds</h3>
    <p>
      In order to interact with the Melon protocol, please switch to Kovan
      Network in Metamask. The page should load within few seconds.{' '}
    </p>
    <p>Also make sure to unlock your wallet by entering your password.</p>
  </div>
);

export default WrongNetwork;
