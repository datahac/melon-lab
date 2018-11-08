import React, { StatelessComponent } from 'react';

export const LockedWallet: StatelessComponent = () => (
  <div className="locked-wallet">
    <h3>Welcome to the future of investment funds</h3>
    <p>
      You are almost ready to use Melon! It seems like you have Metamask set on
      the Kovan Network: that&#39;s wonderful!{' '}
    </p>
    <p>
      <strong>
        Last thing you need to do is unlock your wallet by entering your
        password.{' '}
      </strong>
    </p>
  </div>
);

export default LockedWallet;
