import React, { StatelessComponent, Fragment } from 'react';
import Link from '~/blocks/Link';
import Notification from '~/blocks/Notification/index';

export interface InsufficientFundsProps {
  eth: string;
  weth: string;
  address: string;
}

export const InsufficientFunds: StatelessComponent<InsufficientFundsProps> = ({
  eth,
  weth,
  address,
}) => (
  <Notification isWarning>
    <b>Insufficient ETH Balance</b>
    <p>
      You don't have enough Kovan Ether or Kovan W-ETH. Current balances: {weth}{' '}
      WETH-T, {eth} ETH
      <br />
      To get started, head to our faucet to receive Kovan Ether and Kovan Melon
      <br />
      Once you have received ETH-T and MLN-T, go ahead and create your Melon
      fund.
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
