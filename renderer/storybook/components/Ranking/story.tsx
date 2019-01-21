import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Ranking from './index';

const availableOrdering = [
  {
    name: 'Highest rank',
    value: '+rank',
  },
  {
    name: 'Lowest rank',
    value: '-rank',
  },
  {
    name: 'Highest price',
    value: '-price',
  },
  {
    name: 'Lowest price',
    value: '+price',
  },
  {
    name: 'Newest',
    value: '-inception',
  },
  {
    name: 'Oldest',
    value: '+inception',
  },
];

const data = {
  funds: [
    {
      name: 'Black Turtle',
      address: '0x5bBA9263Ab1eA26FF9c0FeE3619e7AAf7C79E02b',
      inception: '26. Jul 2018 10:48',
      sharePrice: {
        base: {
          quantity: '10000',
          token: {
            symbol: 'ETH',
            decimals: 4,
          },
        },
        quote: {
          quantity: '10000',
          token: {
            symbol: 'ETH',
            decimals: 4,
          },
        },
      },
      rank: 1,
    },
    {
      name: 'Quants',
      address: '0xFfDd0ae2efcBDb95fbCd189Fbb194708B3a3B3F9',
      inception: '24. Jul 2018 22:04',
      sharePrice: {
        base: {
          quantity: '10000',
          token: {
            symbol: 'ETH',
            decimals: 4,
          },
        },
        quote: {
          quantity: '10000',
          token: {
            symbol: 'ETH',
            decimals: 4,
          },
        },
      },
      rank: 2,
    },
    {
      name: 'Titanium',
      address: '0xF1e9868Dc7b02AD30358476380Bfcb77A6c2e74e',
      inception: '26. Jul 2018 17:38',
      sharePrice: {
        base: {
          quantity: '10000',
          token: {
            symbol: 'ETH',
            decimals: 4,
          },
        },
        quote: {
          quantity: '10000',
          token: {
            symbol: 'ETH',
            decimals: 4,
          },
        },
      },
      rank: 3,
    },
    {
      name: 'SolidEarnings',
      address: '0xE28073701a7Ba04D30059507B8Ec11Fcc4FD034e',
      inception: '25. Jul 2018 08:26',
      sharePrice: {
        base: {
          quantity: '10000',
          token: {
            symbol: 'ETH',
            decimals: 4,
          },
        },
        quote: {
          quantity: '10000',
          token: {
            symbol: 'ETH',
            decimals: 4,
          },
        },
      },
      rank: 4,
    },
    {
      name: 'JZ',
      address: '0xDB14bA0Ad1939ACE877262Dadb56d15Fe4966bd5',
      inception: '23. Jul 2018 12:43',
      sharePrice: {
        base: {
          quantity: '10000',
          token: {
            symbol: 'ETH',
            decimals: 4,
          },
        },
        quote: {
          quantity: '10000',
          token: {
            symbol: 'ETH',
            decimals: 4,
          },
        },
      },
      rank: 5,
    },
  ],
  loading: false,
  associatedFund: '0xce35Be39A76706f314B2B430e80DaCB77c886242',
  availableOrdering,
  setOrdering: action('setOrdering'),
  setSearch: action('setSearch'),
};

storiesOf('Components|Ranking', module).add('Default', () => {
  return <Ranking {...data} />;
});
