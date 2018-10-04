import React from 'react';
import { networks } from '@melonproject/melon.js';
import EthereumQuery from './data/ethereum';

export const statusTypes = {
  NEUTRAL: 'NEUTRAL',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
  GOOD: 'GOOD',
};

const getStatus = ({ config, block, network, status }) => {
  if (!block) {
    return {
      message: 'Block overdue',
      type: statusTypes.WARNING,
    };
  }

  // if (!isNetworkValid) {
  //   return {
  //     message: 'Not ready',
  //     type: statusTypes.WARNING,
  //   };
  // }

  if (status.isSyncing) {
    return {
      message: 'Node not synced',
      type: statusTypes.WARNING,
    };
  }

  if (!status.priceFeedUp) {
    return {
      message: 'Price feed down',
      type: statusTypes.ERROR,
      link: `https://${
        network === networks.KOVAN ? 'kovan.' : ''
      }etherscan.io/address/${config.canonicalPriceFeedAddress}`,
    };
  }

  // if (!isReadyToInteract) {
  //   return {
  //     message: 'Insufficent ETH',
  //     type: statusTypes.WARNING,
  //   };
  // }

  // if (!isReadyToInvest) {
  //   return {
  //     message: 'Insufficent MLN',
  //     type: statusTypes.WARNING,
  //   };
  // }

  return {
    message: 'Melon Node',
    type: statusTypes.NEUTRAL,
  };
};

const EthereumState = ({ children }) => (
  <EthereumQuery>
    {props => {
      const { loading, ...data } = props;
      // const isSyncing = !!data.isSyncing;
      // const isNetworkValid =
      //   (!!data.ethereumNetwork && data.ethereumNetwork === '42') ||
      //   data.ethereumNetwork === '1';
      // const hasAccount = !!data.accountAddress;
      // const hasEth = data.ethBalance && !isZero(data.ethBalance);
      // const hasCurrentBlock = data.currentBlock && !isZero(data.currentBlock);

      // const isReadyToInteract =
      //   !isSyncing && isNetworkValid && hasAccount && hasCurrentBlock && hasEth;

      // const isCompetition = true;
      // const isReadyToInvest =
      //   isReadyToInteract && isCompetition
      //     ? true
      //     : data.wethBalance && !isZero(data.wethBalance);

      // const state = {
      //   ...data,
      //   isNetworkValid,
      //   isReadyToInteract,
      //   isReadyToInvest,
      // };

      return children({
        ...data,
        message: !loading && getStatus(data),
        loading,
      });
    }}
  </EthereumQuery>
);

export default EthereumState;
