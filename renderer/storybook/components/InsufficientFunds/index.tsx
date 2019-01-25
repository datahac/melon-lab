import React, { StatelessComponent, Fragment } from 'react';
import Link from '~/blocks/Link';
import Notification from '~/blocks/Notification/index';

export interface InsufficientFundsProps {
  eth: string;
  address: string;
}

export const InsufficientFunds: StatelessComponent<InsufficientFundsProps> = ({
  eth,
  address,
}) => (
  <Notification isWarning={true}>
    <b>Insufficient ETH Balance</b>
    <p>
      You don't have enough Ether. Current balance: {eth} ETH
      <br />
      To get started, head to faucet to receive Ether.
      <br />
      Once you have received ETH, go ahead and create your Melon fund.
    </p>

    <Link
      target="_blank"
      style="secondary"
      size="medium"
      href={`https://faucet.melon.fund/?address=${address}`}
    >
      Go to faucet
    </Link>
  </Notification>
);

export default InsufficientFunds;
