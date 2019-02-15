import React, { useState, useEffect } from 'react';
import { NetworkConsumer } from '../NetworkContext';

const SettingsContext = React.createContext({
  gasPrice: 5,
  isWarningModalOpen: false,
  isNetworkModalOpen: false,
});

export const SettingsConsumer = SettingsContext.Consumer;

const SettingsProvider = ({ children, network }) => {
  const [gasPrice, setGasPrice] = useState(5);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(
    network === 'LIVE',
  );
  const [isNetworkModalOpen, setIsNetworkModalOpen] = useState(!network);

  useEffect(() => {
    if (network === 'LIVE') setIsWarningModalOpen(true);
  }, [network]);

  return (
    <SettingsContext.Provider
      value={{
        gasPrice,
        setGasPrice,
        isWarningModalOpen,
        setIsWarningModalOpen,
        isNetworkModalOpen,
        setIsNetworkModalOpen,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

const WrappedSettingsProvider = ({ children }) => (
  <NetworkConsumer>
    {networkProps => (
      <SettingsProvider network={networkProps.network}>
        {children}
      </SettingsProvider>
    )}
  </NetworkConsumer>
);

export default WrappedSettingsProvider;
