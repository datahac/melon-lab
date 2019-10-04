import React, { useState, useEffect } from 'react';
import { NetworkConsumer } from '../NetworkContext';

const SettingsContext = React.createContext({
  gasPrice: 5,
  isWarningModalOpen: false,
});

export const SettingsConsumer = SettingsContext.Consumer;

const SettingsProvider = ({ children, network }) => {
  const [gasPrice, setGasPrice] = useState(5);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(network === 'LIVE');

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
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

const WrappedSettingsProvider = ({ children }) => (
  <NetworkConsumer>
    {networkProps => <SettingsProvider network={networkProps.network}>{children}</SettingsProvider>}
  </NetworkConsumer>
);

export default WrappedSettingsProvider;
