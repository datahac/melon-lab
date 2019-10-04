import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import OrderBookTable from './index';

const data = {
  entries: [
    {
      volume: '1',
      order: {
        id: '35181',
        price: '1.5',
        sell: {
          howMuch: '1.5',
          symbol: 'WETH',
        },
        buy: { howMuch: '1', symbol: 'MLN', __typename: 'HowMuchOfAsset' },
        type: 'buy',
        exchange: 'OASIS_DEX',
        exchangeContractAddress: '0xbED692938E714Da2a1d5407E5D99658F7D4c8079',
        isActive: true,
      },
    },
    {
      volume: '2',
      order: {
        id: '35180',
        price: '0.5',
        sell: {
          howMuch: '0.5',
          symbol: 'WETH',
        },
        buy: { howMuch: '1', symbol: 'MLN', __typename: 'HowMuchOfAsset' },
        type: 'buy',
        exchange: 'OASIS_DEX',
        exchangeContractAddress: '0xbED692938E714Da2a1d5407E5D99658F7D4c8079',
        isActive: true,
      },
    },
    {
      volume: '290.419178541452765',
      order: {
        id: '82308000392722064780839831843676531186157865405440223968573990222569806632804',
        expiration: '1533890177',
        feeRecipient: '0x173a2467cece1f752eb8416e337d0f0b58cad795',
        makerFee: '0',
        takerFee: '0',
        salt: '82308000392722064780839831843676531186157865405440223968573990222569806632804',
        signature: {
          v: 28,
          r: '0xbbe3e3d22f889e0d3f8b3636c1b20e10e96eb319871a28cf131c6e71deb3c023',
          s: '0x27d938b1879821b30e8b150c024c65d3b9742cd38aceae83a510a1bd52d163f9',
        },
        maker: '0x000f93dd15be2fd9aa56100e81dc1fd580e8cef3',
        taker: '0x0000000000000000000000000000000000000000',
        price: '0.03467175813539999996',
        sell: {
          howMuch: '10',
          symbol: 'WETH',
        },
        buy: {
          howMuch: '288.419178541452765',
          symbol: 'MLN',
        },
        type: 'buy',
        exchange: 'ERC_DEX',
        exchangeContractAddress: '0x90fe2af704b34e0224bf2299c838e04d4dcf1364',
        isActive: true,
      },
    },
    {
      volume: '578.83835708290553',
      order: {
        id: '35208',
        price: '0.03467175813539999996',
        sell: {
          howMuch: '10',
          symbol: 'WETH',
        },
        buy: {
          howMuch: '288.419178541452765',
          symbol: 'MLN',
        },
        type: 'buy',
        exchange: 'OASIS_DEX',
        exchangeContractAddress: '0xbED692938E714Da2a1d5407E5D99658F7D4c8079',
        isActive: true,
      },
    },
    {
      volume: '868.988050695607011',
      order: {
        id: '35209',
        price: '0.03446496832544731614',
        sell: {
          howMuch: '10',
          symbol: 'WETH',
        },
        buy: {
          howMuch: '290.149693612701481',
          symbol: 'MLN',
        },
        type: 'buy',
        exchange: 'OASIS_DEX',
        exchangeContractAddress: '0xbED692938E714Da2a1d5407E5D99658F7D4c8079',
        isActive: true,
      },
    },
    {
      volume: '1159.137744308308492',
      order: {
        id: '113800866172774416504623384277397812966239744209968072974179274104386711996',
        expiration: '1533890193',
        feeRecipient: '0x173a2467cece1f752eb8416e337d0f0b58cad795',
        makerFee: '0',
        takerFee: '0',
        salt: '113800866172774416504623384277397812966239744209968072974179274104386711996',
        signature: {
          v: 27,
          r: '0x944213f861cd9ebfdf17d85bd38493123b47379aa80837327f011b29d3530615',
          s: '0x48b6da93838bc01bfc50c24e2fde121d8ad180a229805f04bbc5e43f03090a63',
        },
        maker: '0x000f93dd15be2fd9aa56100e81dc1fd580e8cef3',
        taker: '0x0000000000000000000000000000000000000000',

        price: '0.03446496832544731614',
        sell: {
          howMuch: '10',
          symbol: 'WETH',
        },
        buy: {
          howMuch: '290.149693612701481',
          symbol: 'MLN',
        },
        type: 'buy',
        exchange: 'ERC_DEX',
        exchangeContractAddress: '0x90fe2af704b34e0224bf2299c838e04d4dcf1364',
        isActive: true,
      },
    },
    {
      volume: '1452.460048884965954',
      order: {
        id: '35210',

        price: '0.03409219089026548669',
        sell: {
          howMuch: '10',
          symbol: 'WETH',
        },
        buy: {
          howMuch: '293.322304576657462',
          symbol: 'MLN',
        },
        type: 'buy',
        exchange: 'OASIS_DEX',
        exchangeContractAddress: '0xbED692938E714Da2a1d5407E5D99658F7D4c8079',
        isActive: true,
      },
    },
    {
      volume: '1745.782353461623416',
      order: {
        id: '96776313600780594239625648986583570374390282304979507394055377602011602578406',
        expiration: '1533890213',
        feeRecipient: '0x173a2467cece1f752eb8416e337d0f0b58cad795',
        makerFee: '0',
        takerFee: '0',
        salt: '96776313600780594239625648986583570374390282304979507394055377602011602578406',
        signature: {
          v: 27,
          r: '0xfd16b2de5004732fa9425cc0dc0ad7001efbfb46af58dc06bd54ecf1f2bfec90',
          s: '0x10100a8575e98008ae044a3ffd45a99fc723a3c62a2f44f96d50cfb4360f32b2',
        },
        maker: '0x000f93dd15be2fd9aa56100e81dc1fd580e8cef3',
        taker: '0x0000000000000000000000000000000000000000',
        price: '0.03409219089026548669',
        sell: {
          howMuch: '10',
          symbol: 'WETH',
        },
        buy: {
          howMuch: '293.322304576657462',
          symbol: 'MLN',
        },
        type: 'buy',
        exchange: 'ERC_DEX',
        exchangeContractAddress: '0x90fe2af704b34e0224bf2299c838e04d4dcf1364',
        isActive: true,
      },
    },
    {
      volume: '2042.854107359319764',
      order: {
        id: '62745833173228774081066255167991918157047470531730258564989614196330867701429',
        expiration: '1533890229',
        feeRecipient: '0x173a2467cece1f752eb8416e337d0f0b58cad795',
        makerFee: '0',
        takerFee: '0',
        salt: '62745833173228774081066255167991918157047470531730258564989614196330867701429',
        signature: {
          v: 27,
          r: '0x1884daf5d8495f14af59ea4690e3ee17c878269ac6b260eea1c8f7e452a2889c',
          s: '0x08daf90fd886424fbd9189ad273b1023f655412fb02d89304779999d4925718b',
        },
        maker: '0x000f93dd15be2fd9aa56100e81dc1fd580e8cef3',
        taker: '0x0000000000000000000000000000000000000000',
        price: '0.03366190110233009704',
        sell: {
          howMuch: '10',
          symbol: 'WETH',
        },
        buy: {
          howMuch: '297.071753897696348',
          symbol: 'MLN',
        },
        type: 'buy',
        exchange: 'ERC_DEX',
        exchangeContractAddress: '0x90fe2af704b34e0224bf2299c838e04d4dcf1364',
        isActive: true,
      },
    },
    {
      volume: '2339.925861257016112',
      order: {
        id: '35211',
        price: '0.03366190110233009704',
        sell: {
          howMuch: '10',
          symbol: 'WETH',
        },
        buy: {
          howMuch: '297.071753897696348',
          symbol: 'MLN',
        },
        type: 'buy',
        exchange: 'OASIS_DEX',
        exchangeContractAddress: '0xbED692938E714Da2a1d5407E5D99658F7D4c8079',
        isActive: true,
      },
    },
    {
      volume: '2637.574453511795365',
      order: {
        id: '35212',
        price: '0.03359666485988372095',
        sell: {
          howMuch: '10',
          symbol: 'WETH',
        },
        buy: {
          howMuch: '297.648592254779253',
          symbol: 'MLN',
        },
        type: 'buy',
        exchange: 'OASIS_DEX',
        exchangeContractAddress: '0xbED692938E714Da2a1d5407E5D99658F7D4c8079',
        isActive: true,
      },
    },
    {
      volume: '2935.223045766574618',
      order: {
        id: '65765178849432166838664565564223588120931810247755896294500846507735706768778',
        expiration: '1533890249',
        feeRecipient: '0x173a2467cece1f752eb8416e337d0f0b58cad795',
        makerFee: '0',
        takerFee: '0',
        salt: '65765178849432166838664565564223588120931810247755896294500846507735706768778',
        signature: {
          v: 27,
          r: '0x6c1a8a8f8ce3cc8f128206f66838cd8461f92ae9a7b9604dbdd4e1d394b63783',
          s: '0x5d90dea5cc755a5288287e2e56857df7f63b4b6efa8f9ccaabd7c31b1e28b404',
        },
        maker: '0x000f93dd15be2fd9aa56100e81dc1fd580e8cef3',
        taker: '0x0000000000000000000000000000000000000000',

        price: '0.03359666485988372095',
        sell: {
          howMuch: '10',
          symbol: 'WETH',
        },
        buy: {
          howMuch: '297.648592254779253',
          symbol: 'MLN',
        },
        type: 'buy',
        exchange: 'ERC_DEX',
        exchangeContractAddress: '0x90fe2af704b34e0224bf2299c838e04d4dcf1364',
        isActive: true,
      },
    },
    {
      volume: '3236.621087342392757',
      order: {
        id: '7615851857606809569329377127359118203606056606422405268266811601217946939114',
        expiration: '1533890265',
        feeRecipient: '0x173a2467cece1f752eb8416e337d0f0b58cad795',
        makerFee: '0',
        takerFee: '0',
        salt: '7615851857606809569329377127359118203606056606422405268266811601217946939114',
        signature: {
          v: 28,
          r: '0xee87f4c319bf0ecff6a1daab1e3845b5d2b59697422a7c36b445851c6d348923',
          s: '0x3591539193fb926c45ada49ced537bce4139406b75d1b300d35621dc7f98a44b',
        },
        maker: '0x000f93dd15be2fd9aa56100e81dc1fd580e8cef3',
        taker: '0x0000000000000000000000000000000000000000',
        price: '0.03317871591904306221',
        sell: {
          howMuch: '10',
          symbol: 'WETH',
        },
        buy: {
          howMuch: '301.398041575818139',
          symbol: 'MLN',
        },
        type: 'buy',
        exchange: 'ERC_DEX',
        exchangeContractAddress: '0x90fe2af704b34e0224bf2299c838e04d4dcf1364',
        isActive: true,
      },
    },
    {
      volume: '3538.019128918210896',
      order: {
        id: '35213',

        price: '0.03317871591904306221',
        sell: {
          howMuch: '10',
          symbol: 'WETH',
        },
        buy: {
          howMuch: '301.398041575818139',
          symbol: 'MLN',
        },
        type: 'buy',
        exchange: 'OASIS_DEX',
        exchangeContractAddress: '0xbED692938E714Da2a1d5407E5D99658F7D4c8079',
        isActive: true,
      },
    },
    {
      volume: '3843.455038993609374',
      order: {
        id: '35214',
        price: '0.03274009266798866853',
        sell: {
          howMuch: '10',
          symbol: 'WETH',
        },
        buy: {
          howMuch: '305.435910075398478',
          symbol: 'MLN',
        },
        type: 'buy',
        exchange: 'OASIS_DEX',
        exchangeContractAddress: '0xbED692938E714Da2a1d5407E5D99658F7D4c8079',
        isActive: true,
      },
    },
    {
      volume: '4148.890949069007852',
      order: {
        id: '67251964846712113589105067487459297212505430254706952884314748608752903382916',
        expiration: '1533890285',
        feeRecipient: '0x173a2467cece1f752eb8416e337d0f0b58cad795',
        makerFee: '0',
        takerFee: '0',
        salt: '67251964846712113589105067487459297212505430254706952884314748608752903382916',
        signature: {
          v: 28,
          r: '0x2e86e9b5ab5ec0993c67fab778cd9d5a14a5825be56e2a7b03ada9a6590d72fa',
          s: '0x784bdf72a33e54341042634ba7b7f57c9b286e35736c54d3877f5a9d7c403513',
        },
        maker: '0x000f93dd15be2fd9aa56100e81dc1fd580e8cef3',
        taker: '0x0000000000000000000000000000000000000000',

        price: '0.03274009266798866853',
        sell: {
          howMuch: '10',
          symbol: 'WETH',
        },
        buy: {
          howMuch: '305.435910075398478',
          symbol: 'MLN',
        },
        type: 'buy',
        exchange: 'ERC_DEX',
        exchangeContractAddress: '0x90fe2af704b34e0224bf2299c838e04d4dcf1364',
        isActive: true,
      },
    },
    {
      volume: '4456.922631751279405',
      order: {
        id: '35215',

        price: '0.03246419301067415727',
        sell: {
          howMuch: '10',
          symbol: 'WETH',
        },
        buy: {
          howMuch: '308.031682682271553',
          symbol: 'MLN',
        },
        type: 'buy',
        exchange: 'OASIS_DEX',
        exchangeContractAddress: '0xbED692938E714Da2a1d5407E5D99658F7D4c8079',
        isActive: true,
      },
    },
    {
      volume: '4764.954314433550958',
      order: {
        id: '74548636906738055573517807206275655438527861345553564536259842939483268685658',
        expiration: '1533890301',
        feeRecipient: '0x173a2467cece1f752eb8416e337d0f0b58cad795',
        makerFee: '0',
        takerFee: '0',
        salt: '74548636906738055573517807206275655438527861345553564536259842939483268685658',
        signature: {
          v: 27,
          r: '0xc3f1ca83fddf84c200d34acc5c481d9984479586a1ee66c5430e8b80eb2adc4d',
          s: '0x64c37b921c42ca450788a8900719c5c6d941d0e49443167f6dac7c71e8bff3d8',
        },
        maker: '0x000f93dd15be2fd9aa56100e81dc1fd580e8cef3',
        taker: '0x0000000000000000000000000000000000000000',

        price: '0.03246419301067415727',
        sell: {
          howMuch: '10',
          symbol: 'WETH',
        },
        buy: {
          howMuch: '308.031682682271553',
          symbol: 'MLN',
        },
        type: 'buy',
        exchange: 'ERC_DEX',
        exchangeContractAddress: '0x90fe2af704b34e0224bf2299c838e04d4dcf1364',
        isActive: true,
      },
    },
    {
      volume: '5076.447027258319944',
      order: {
        id: '35216',

        price: '0.03210347975499999999',
        sell: {
          howMuch: '10',
          symbol: 'WETH',
        },
        buy: {
          howMuch: '311.492712824768986',
          symbol: 'MLN',
        },
        type: 'buy',
        exchange: 'OASIS_DEX',
        exchangeContractAddress: '0xbED692938E714Da2a1d5407E5D99658F7D4c8079',
        isActive: true,
      },
    },
    {
      volume: '5387.93974008308893',
      order: {
        id: '25598525409006788019377570006798783760140035732676827506219796205888225011364',
        expiration: '1533890321',
        feeRecipient: '0x173a2467cece1f752eb8416e337d0f0b58cad795',
        makerFee: '0',
        takerFee: '0',
        salt: '25598525409006788019377570006798783760140035732676827506219796205888225011364',
        signature: {
          v: 28,
          r: '0xc48e2030b9b461288ce08c3f6bb86255367400043e9c8ee1849ce2efcbbdf887',
          s: '0x639e787db932b9698437e4e0166974b89c4cabecd88c2f738d0f109d5dbf13c9',
        },
        maker: '0x000f93dd15be2fd9aa56100e81dc1fd580e8cef3',
        taker: '0x0000000000000000000000000000000000000000',

        price: '0.03210347975499999999',
        sell: {
          howMuch: '10',
          symbol: 'WETH',
        },
        buy: {
          howMuch: '311.492712824768986',
          symbol: 'MLN',
        },
        type: 'buy',
        exchange: 'ERC_DEX',
        exchangeContractAddress: '0x90fe2af704b34e0224bf2299c838e04d4dcf1364',
        isActive: true,
      },
    },
    {
      volume: '5701.451387157648085',
      order: {
        id: '3706839253204025122373570205042155544336209410007250498015918615454407753340',
        expiration: '1533890337',
        feeRecipient: '0x173a2467cece1f752eb8416e337d0f0b58cad795',
        makerFee: '0',
        takerFee: '0',
        salt: '3706839253204025122373570205042155544336209410007250498015918615454407753340',
        signature: {
          v: 27,
          r: '0x7310266ff404a6a93864a2cd556ea61c6b74b780994f82d685a79981e386ee50',
          s: '0x0128e390c762e5523c342b92a0873d95e8fb06f84aaa58ad42dd02afb4a95579',
        },
        maker: '0x000f93dd15be2fd9aa56100e81dc1fd580e8cef3',
        taker: '0x0000000000000000000000000000000000000000',

        price: '0.03189674161490340389',
        sell: {
          howMuch: '10',
          symbol: 'WETH',
        },
        buy: {
          howMuch: '313.511647074559155',
          symbol: 'MLN',
        },
        type: 'buy',
        exchange: 'ERC_DEX',
        exchangeContractAddress: '0x90fe2af704b34e0224bf2299c838e04d4dcf1364',
        isActive: true,
      },
    },
    {
      volume: '6014.96303423220724',
      order: {
        id: '35217',

        price: '0.03189674161490340389',
        sell: {
          howMuch: '10',
          symbol: 'WETH',
        },
        buy: {
          howMuch: '313.511647074559155',
          symbol: 'MLN',
        },
        type: 'buy',
        exchange: 'OASIS_DEX',
        exchangeContractAddress: '0xbED692938E714Da2a1d5407E5D99658F7D4c8079',
        isActive: true,
      },
    },
  ],
  onClickOrder: action('onClickOrder'),
  canTrade: true,
  baseToken: 'MLN',
  quoteToken: 'WETH',
  totalVolume: '6014.96303423220724',
  style: 'buy',
};

const noData = {
  canTrade: true,
  baseToken: 'MLN',
  quoteToken: 'WETH',
  entries: [],
  onClickOrder: action('onClickOrder'),
  style: 'buy',
};

storiesOf('Components|Orderbook table', module)
  .add('Default', () => {
    return <OrderBookTable {...data} />;
  })
  .add('No data', () => {
    return <OrderBookTable {...noData} />;
  });
