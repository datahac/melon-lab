import React, { useState } from 'react';

const GasPriceContext = React.createContext({
  gasPrice: 2,
});

export const GasPriceConsumer = GasPriceContext.Consumer;

const GasPriceProvider = ({ children }) => {
  const [gasPrice, setGasPrice] = useState(2);

  return (
    <GasPriceContext.Provider
      value={{
        gasPrice,
        setGasPrice,
      }}
    >
      {children}
    </GasPriceContext.Provider>
  );
};

export default GasPriceProvider;
