import React from 'react';
import { networks } from '@melonproject/melon.js';
import { isZero } from '~/utils/functionalBigNumber';
import EthereumQuery from './data/ethereum';

export const statusTypes = {
  NEUTRAL: 'NEUTRAL',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
  GOOD: 'GOOD',
};

const getStatus = ({
  canonicalPriceFeedAddress,
  network,
  canInteract,
  canInvest,
  hasCurrentBlock,
  blockOverdue,
  nodeSynced,
  priceFeedUp,
}) => {
  if (!hasCurrentBlock) {
    return {
      message: 'Not ready',
      type: statusTypes.WARNING,
    };
  }

  if (blockOverdue) {
    return {
      message: 'Block overdue',
      type: statusTypes.WARNING,
    };
  }

  if (!nodeSynced) {
    return {
      message: 'Node not synced',
      type: statusTypes.WARNING,
    };
  }

  if (!priceFeedUp) {
    return {
      message: 'Price feed down',
      type: statusTypes.ERROR,
      link: `https://${
        network === networks.KOVAN ? 'kovan.' : ''
      }etherscan.io/address/${canonicalPriceFeedAddress}`,
    };
  }

  if (!canInteract) {
    return {
      message: 'Insufficent ETH',
      type: statusTypes.WARNING,
    };
  }

  if (!canInvest) {
    return {
      message: 'Insufficent MLN',
      type: statusTypes.WARNING,
    };
  }

  return {
    message: 'Melon Node',
    type: statusTypes.NEUTRAL,
  };
};

const EthereumState = ({ children }) => (
  <EthereumQuery>
    {props => {
      const { loading, ...data } = props;
      const { account, nodeSynced, currentBlock, eth, weth } = data;

      const hasAccount = !!account;
      const hasEth = eth && !isZero(eth);
      const hasCurrentBlock = currentBlock && !isZero(data.currentBlock);
      const isSynced = !!nodeSynced;
      const isCompetition = false;
      const canInteract = isSynced && hasAccount && hasCurrentBlock && hasEth;
      const canInvest = canInteract && isCompetition ? true : weth && !isZero(weth);

      const state = {
        ...data,
        // TODO: Add a time interval that watches currentBlock changes.
        blockOverdue: false,
        canInvest,
        canInteract,
      };

      return children({
        ...data,
        message: !loading && getStatus(state),
        loading,
      });
    }}
  </EthereumQuery>
);

export default EthereumState;
