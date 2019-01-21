import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Holdings from './index';

const data = {
  isReadyToTrade: true,
  priceFeedUp: true,
  quoteAsset: 'WETH',
  onClick: action('selectAsset'),
  holdings: [
    {
      symbol: 'ANT-T',
      balance: {
        quantity: '10000',
        token: {
          symbol: 'ETH',
          decimals: 4,
        },
      },
      price: {
        base: {
          quantity: '1',
          token: {
            symbol: 'ETH',
            decimals: 4,
          },
        },
        quote: {
          quantity: '1',
          token: {
            symbol: 'MLN',
            decimals: 4,
          },
        },
      },
      fraction: '0.0000',
    },
    {
      symbol: 'BAT-T',
      balance: {
        quantity: '10000',
        token: {
          symbol: 'ETH',
          decimals: 4,
        },
      },
      price: {
        base: {
          quantity: '1',
          token: {
            symbol: 'ETH',
            decimals: 4,
          },
        },
        quote: {
          quantity: '1',
          token: {
            symbol: 'MLN',
            decimals: 4,
          },
        },
      },
      fraction: '0.0000',
    },
    {
      symbol: 'DGD-T',
      balance: {
        quantity: '10000',
        token: {
          symbol: 'ETH',
          decimals: 4,
        },
      },
      price: {
        base: {
          quantity: '1',
          token: {
            symbol: 'ETH',
            decimals: 4,
          },
        },
        quote: {
          quantity: '1',
          token: {
            symbol: 'MLN',
            decimals: 4,
          },
        },
      },
      fraction: '0.0000',
    },
    {
      symbol: 'DGX-T',
      balance: {
        quantity: '10000',
        token: {
          symbol: 'ETH',
          decimals: 4,
        },
      },
      price: {
        base: {
          quantity: '1',
          token: {
            symbol: 'ETH',
            decimals: 4,
          },
        },
        quote: {
          quantity: '1',
          token: {
            symbol: 'MLN',
            decimals: 4,
          },
        },
      },
      fraction: '0.0000',
    },
    {
      symbol: 'GNO-T',
      balance: {
        quantity: '10000',
        token: {
          symbol: 'ETH',
          decimals: 4,
        },
      },
      price: {
        base: {
          quantity: '1',
          token: {
            symbol: 'ETH',
            decimals: 4,
          },
        },
        quote: {
          quantity: '1',
          token: {
            symbol: 'MLN',
            decimals: 4,
          },
        },
      },
      fraction: '0.0000',
    },
    {
      symbol: 'REP-T',
      balance: {
        quantity: '10000',
        token: {
          symbol: 'ETH',
          decimals: 4,
        },
      },
      price: {
        base: {
          quantity: '1',
          token: {
            symbol: 'ETH',
            decimals: 4,
          },
        },
        quote: {
          quantity: '1',
          token: {
            symbol: 'MLN',
            decimals: 4,
          },
        },
      },
      fraction: '0.0000',
    },
    {
      symbol: 'ZRX-T',
      balance: {
        quantity: '10000',
        token: {
          symbol: 'ETH',
          decimals: 4,
        },
      },
      price: {
        base: {
          quantity: '1',
          token: {
            symbol: 'ETH',
            decimals: 4,
          },
        },
        quote: {
          quantity: '1',
          token: {
            symbol: 'MLN',
            decimals: 4,
          },
        },
      },
      fraction: '0.0000',
    },
    {
      symbol: 'REQ-T',
      balance: {
        quantity: '10000',
        token: {
          symbol: 'ETH',
          decimals: 4,
        },
      },
      price: {
        base: {
          quantity: '1',
          token: {
            symbol: 'ETH',
            decimals: 4,
          },
        },
        quote: {
          quantity: '1',
          token: {
            symbol: 'MLN',
            decimals: 4,
          },
        },
      },
      fraction: '0.0000',
    },
    {
      symbol: 'WETH',
      balance: {
        quantity: '10000',
        token: {
          symbol: 'ETH',
          decimals: 4,
        },
      },
      price: {
        base: {
          quantity: '1',
          token: {
            symbol: 'ETH',
            decimals: 4,
          },
        },
        quote: {
          quantity: '1',
          token: {
            symbol: 'MLN',
            decimals: 4,
          },
        },
      },
      fraction: '50.5764',
    },
    {
      symbol: 'MLN',
      balance: {
        quantity: '10000',
        token: {
          symbol: 'ETH',
          decimals: 4,
        },
      },
      price: {
        base: {
          quantity: '1',
          token: {
            symbol: 'ETH',
            decimals: 4,
          },
        },
        quote: {
          quantity: '1',
          token: {
            symbol: 'MLN',
            decimals: 4,
          },
        },
      },
      fraction: '49.4236',
    },
    {
      symbol: 'MKR-T',
      balance: {
        quantity: '10000',
        token: {
          symbol: 'ETH',
          decimals: 4,
        },
      },
      price: {
        base: {
          quantity: '1',
          token: {
            symbol: 'ETH',
            decimals: 4,
          },
        },
        quote: {
          quantity: '1',
          token: {
            symbol: 'MLN',
            decimals: 4,
          },
        },
      },
      fraction: '0.0000',
    },
    {
      symbol: 'DAI-T',
      balance: {
        quantity: '10000',
        token: {
          symbol: 'ETH',
          decimals: 4,
        },
      },
      price: {
        base: {
          quantity: '1',
          token: {
            symbol: 'ETH',
            decimals: 4,
          },
        },
        quote: {
          quantity: '1',
          token: {
            symbol: 'MLN',
            decimals: 4,
          },
        },
      },
      fraction: '0.0000',
    },
    {
      symbol: 'KNC-T',
      balance: {
        quantity: '10000',
        token: {
          symbol: 'ETH',
          decimals: 4,
        },
      },
      price: {
        base: {
          quantity: '1',
          token: {
            symbol: 'ETH',
            decimals: 4,
          },
        },
        quote: {
          quantity: '1',
          token: {
            symbol: 'MLN',
            decimals: 4,
          },
        },
      },
      fraction: '0.0000',
    },
    {
      symbol: 'JNT-T',
      balance: {
        quantity: '10000',
        token: {
          symbol: 'ETH',
          decimals: 4,
        },
      },
      price: {
        base: {
          quantity: '1',
          token: {
            symbol: 'ETH',
            decimals: 4,
          },
        },
        quote: {
          quantity: '1',
          token: {
            symbol: 'MLN',
            decimals: 4,
          },
        },
      },
      fraction: '0.0000',
    },
    {
      symbol: 'OMG-T',
      balance: {
        quantity: '10000',
        token: {
          symbol: 'ETH',
          decimals: 4,
        },
      },
      price: {
        base: {
          quantity: '1',
          token: {
            symbol: 'ETH',
            decimals: 4,
          },
        },
        quote: {
          quantity: '1',
          token: {
            symbol: 'MLN',
            decimals: 4,
          },
        },
      },
      fraction: '0.0000',
    },
    {
      symbol: 'NMR-T',
      balance: {
        quantity: '10000',
        token: {
          symbol: 'ETH',
          decimals: 4,
        },
      },
      price: {
        base: {
          quantity: '1',
          token: {
            symbol: 'ETH',
            decimals: 4,
          },
        },
        quote: {
          quantity: '1',
          token: {
            symbol: 'MLN',
            decimals: 4,
          },
        },
      },
      fraction: '0.0000',
    },
  ],
};

storiesOf('Components|Holdings', module).add('Default', () => {
  return <Holdings {...data} />;
});
