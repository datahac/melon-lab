import React from 'react';
import Orderbook from './index';

const data = {
  loading: false,
  isReadyToTrade: true,
  baseToken: 'MLN-T',
  quoteToken: 'WETH-T',
  decimals: 4,
  orderbook: {
    totalBuyVolume: '6014.96303423220724',
    totalSellVolume: '2756.383767891347375',
    buyEntries: [
      {
        volume: '1',
        order: {
          id: '35181',
          price: '1.5',
          sell: {
            howMuch: '1.5',
            symbol: 'WETH-T',
          },
          buy: { howMuch: '1', symbol: 'MLN-T', __typename: 'HowMuchOfAsset' },
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
            symbol: 'WETH-T',
          },
          buy: { howMuch: '1', symbol: 'MLN-T', __typename: 'HowMuchOfAsset' },
          type: 'buy',
          exchange: 'OASIS_DEX',
          exchangeContractAddress: '0xbED692938E714Da2a1d5407E5D99658F7D4c8079',
          isActive: true,
        },
      },
      {
        volume: '290.419178541452765',
        order: {
          id:
            '82308000392722064780839831843676531186157865405440223968573990222569806632804',
          expiration: '1533890177',
          feeRecipient: '0x173a2467cece1f752eb8416e337d0f0b58cad795',
          makerFee: '0',
          takerFee: '0',
          salt:
            '82308000392722064780839831843676531186157865405440223968573990222569806632804',
          signature: {
            v: 28,
            r:
              '0xbbe3e3d22f889e0d3f8b3636c1b20e10e96eb319871a28cf131c6e71deb3c023',
            s:
              '0x27d938b1879821b30e8b150c024c65d3b9742cd38aceae83a510a1bd52d163f9',
          },
          maker: '0x000f93dd15be2fd9aa56100e81dc1fd580e8cef3',
          taker: '0x0000000000000000000000000000000000000000',
          price: '0.03467175813539999996',
          sell: {
            howMuch: '10',
            symbol: 'WETH-T',
          },
          buy: {
            howMuch: '288.419178541452765',
            symbol: 'MLN-T',
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
            symbol: 'WETH-T',
          },
          buy: {
            howMuch: '288.419178541452765',
            symbol: 'MLN-T',
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
            symbol: 'WETH-T',
          },
          buy: {
            howMuch: '290.149693612701481',
            symbol: 'MLN-T',
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
          id:
            '113800866172774416504623384277397812966239744209968072974179274104386711996',
          expiration: '1533890193',
          feeRecipient: '0x173a2467cece1f752eb8416e337d0f0b58cad795',
          makerFee: '0',
          takerFee: '0',
          salt:
            '113800866172774416504623384277397812966239744209968072974179274104386711996',
          signature: {
            v: 27,
            r:
              '0x944213f861cd9ebfdf17d85bd38493123b47379aa80837327f011b29d3530615',
            s:
              '0x48b6da93838bc01bfc50c24e2fde121d8ad180a229805f04bbc5e43f03090a63',
          },
          maker: '0x000f93dd15be2fd9aa56100e81dc1fd580e8cef3',
          taker: '0x0000000000000000000000000000000000000000',

          price: '0.03446496832544731614',
          sell: {
            howMuch: '10',
            symbol: 'WETH-T',
          },
          buy: {
            howMuch: '290.149693612701481',
            symbol: 'MLN-T',
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
            symbol: 'WETH-T',
          },
          buy: {
            howMuch: '293.322304576657462',
            symbol: 'MLN-T',
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
          id:
            '96776313600780594239625648986583570374390282304979507394055377602011602578406',
          expiration: '1533890213',
          feeRecipient: '0x173a2467cece1f752eb8416e337d0f0b58cad795',
          makerFee: '0',
          takerFee: '0',
          salt:
            '96776313600780594239625648986583570374390282304979507394055377602011602578406',
          signature: {
            v: 27,
            r:
              '0xfd16b2de5004732fa9425cc0dc0ad7001efbfb46af58dc06bd54ecf1f2bfec90',
            s:
              '0x10100a8575e98008ae044a3ffd45a99fc723a3c62a2f44f96d50cfb4360f32b2',
          },
          maker: '0x000f93dd15be2fd9aa56100e81dc1fd580e8cef3',
          taker: '0x0000000000000000000000000000000000000000',
          price: '0.03409219089026548669',
          sell: {
            howMuch: '10',
            symbol: 'WETH-T',
          },
          buy: {
            howMuch: '293.322304576657462',
            symbol: 'MLN-T',
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
          id:
            '62745833173228774081066255167991918157047470531730258564989614196330867701429',
          expiration: '1533890229',
          feeRecipient: '0x173a2467cece1f752eb8416e337d0f0b58cad795',
          makerFee: '0',
          takerFee: '0',
          salt:
            '62745833173228774081066255167991918157047470531730258564989614196330867701429',
          signature: {
            v: 27,
            r:
              '0x1884daf5d8495f14af59ea4690e3ee17c878269ac6b260eea1c8f7e452a2889c',
            s:
              '0x08daf90fd886424fbd9189ad273b1023f655412fb02d89304779999d4925718b',
          },
          maker: '0x000f93dd15be2fd9aa56100e81dc1fd580e8cef3',
          taker: '0x0000000000000000000000000000000000000000',
          price: '0.03366190110233009704',
          sell: {
            howMuch: '10',
            symbol: 'WETH-T',
          },
          buy: {
            howMuch: '297.071753897696348',
            symbol: 'MLN-T',
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
            symbol: 'WETH-T',
          },
          buy: {
            howMuch: '297.071753897696348',
            symbol: 'MLN-T',
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
            symbol: 'WETH-T',
          },
          buy: {
            howMuch: '297.648592254779253',
            symbol: 'MLN-T',
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
          id:
            '65765178849432166838664565564223588120931810247755896294500846507735706768778',
          expiration: '1533890249',
          feeRecipient: '0x173a2467cece1f752eb8416e337d0f0b58cad795',
          makerFee: '0',
          takerFee: '0',
          salt:
            '65765178849432166838664565564223588120931810247755896294500846507735706768778',
          signature: {
            v: 27,
            r:
              '0x6c1a8a8f8ce3cc8f128206f66838cd8461f92ae9a7b9604dbdd4e1d394b63783',
            s:
              '0x5d90dea5cc755a5288287e2e56857df7f63b4b6efa8f9ccaabd7c31b1e28b404',
          },
          maker: '0x000f93dd15be2fd9aa56100e81dc1fd580e8cef3',
          taker: '0x0000000000000000000000000000000000000000',

          price: '0.03359666485988372095',
          sell: {
            howMuch: '10',
            symbol: 'WETH-T',
          },
          buy: {
            howMuch: '297.648592254779253',
            symbol: 'MLN-T',
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
          id:
            '7615851857606809569329377127359118203606056606422405268266811601217946939114',
          expiration: '1533890265',
          feeRecipient: '0x173a2467cece1f752eb8416e337d0f0b58cad795',
          makerFee: '0',
          takerFee: '0',
          salt:
            '7615851857606809569329377127359118203606056606422405268266811601217946939114',
          signature: {
            v: 28,
            r:
              '0xee87f4c319bf0ecff6a1daab1e3845b5d2b59697422a7c36b445851c6d348923',
            s:
              '0x3591539193fb926c45ada49ced537bce4139406b75d1b300d35621dc7f98a44b',
          },
          maker: '0x000f93dd15be2fd9aa56100e81dc1fd580e8cef3',
          taker: '0x0000000000000000000000000000000000000000',
          price: '0.03317871591904306221',
          sell: {
            howMuch: '10',
            symbol: 'WETH-T',
          },
          buy: {
            howMuch: '301.398041575818139',
            symbol: 'MLN-T',
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
            symbol: 'WETH-T',
          },
          buy: {
            howMuch: '301.398041575818139',
            symbol: 'MLN-T',
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
            symbol: 'WETH-T',
          },
          buy: {
            howMuch: '305.435910075398478',
            symbol: 'MLN-T',
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
          id:
            '67251964846712113589105067487459297212505430254706952884314748608752903382916',
          expiration: '1533890285',
          feeRecipient: '0x173a2467cece1f752eb8416e337d0f0b58cad795',
          makerFee: '0',
          takerFee: '0',
          salt:
            '67251964846712113589105067487459297212505430254706952884314748608752903382916',
          signature: {
            v: 28,
            r:
              '0x2e86e9b5ab5ec0993c67fab778cd9d5a14a5825be56e2a7b03ada9a6590d72fa',
            s:
              '0x784bdf72a33e54341042634ba7b7f57c9b286e35736c54d3877f5a9d7c403513',
          },
          maker: '0x000f93dd15be2fd9aa56100e81dc1fd580e8cef3',
          taker: '0x0000000000000000000000000000000000000000',

          price: '0.03274009266798866853',
          sell: {
            howMuch: '10',
            symbol: 'WETH-T',
          },
          buy: {
            howMuch: '305.435910075398478',
            symbol: 'MLN-T',
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
            symbol: 'WETH-T',
          },
          buy: {
            howMuch: '308.031682682271553',
            symbol: 'MLN-T',
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
          id:
            '74548636906738055573517807206275655438527861345553564536259842939483268685658',
          expiration: '1533890301',
          feeRecipient: '0x173a2467cece1f752eb8416e337d0f0b58cad795',
          makerFee: '0',
          takerFee: '0',
          salt:
            '74548636906738055573517807206275655438527861345553564536259842939483268685658',
          signature: {
            v: 27,
            r:
              '0xc3f1ca83fddf84c200d34acc5c481d9984479586a1ee66c5430e8b80eb2adc4d',
            s:
              '0x64c37b921c42ca450788a8900719c5c6d941d0e49443167f6dac7c71e8bff3d8',
          },
          maker: '0x000f93dd15be2fd9aa56100e81dc1fd580e8cef3',
          taker: '0x0000000000000000000000000000000000000000',

          price: '0.03246419301067415727',
          sell: {
            howMuch: '10',
            symbol: 'WETH-T',
          },
          buy: {
            howMuch: '308.031682682271553',
            symbol: 'MLN-T',
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
            symbol: 'WETH-T',
          },
          buy: {
            howMuch: '311.492712824768986',
            symbol: 'MLN-T',
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
          id:
            '25598525409006788019377570006798783760140035732676827506219796205888225011364',
          expiration: '1533890321',
          feeRecipient: '0x173a2467cece1f752eb8416e337d0f0b58cad795',
          makerFee: '0',
          takerFee: '0',
          salt:
            '25598525409006788019377570006798783760140035732676827506219796205888225011364',
          signature: {
            v: 28,
            r:
              '0xc48e2030b9b461288ce08c3f6bb86255367400043e9c8ee1849ce2efcbbdf887',
            s:
              '0x639e787db932b9698437e4e0166974b89c4cabecd88c2f738d0f109d5dbf13c9',
          },
          maker: '0x000f93dd15be2fd9aa56100e81dc1fd580e8cef3',
          taker: '0x0000000000000000000000000000000000000000',

          price: '0.03210347975499999999',
          sell: {
            howMuch: '10',
            symbol: 'WETH-T',
          },
          buy: {
            howMuch: '311.492712824768986',
            symbol: 'MLN-T',
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
          id:
            '3706839253204025122373570205042155544336209410007250498015918615454407753340',
          expiration: '1533890337',
          feeRecipient: '0x173a2467cece1f752eb8416e337d0f0b58cad795',
          makerFee: '0',
          takerFee: '0',
          salt:
            '3706839253204025122373570205042155544336209410007250498015918615454407753340',
          signature: {
            v: 27,
            r:
              '0x7310266ff404a6a93864a2cd556ea61c6b74b780994f82d685a79981e386ee50',
            s:
              '0x0128e390c762e5523c342b92a0873d95e8fb06f84aaa58ad42dd02afb4a95579',
          },
          maker: '0x000f93dd15be2fd9aa56100e81dc1fd580e8cef3',
          taker: '0x0000000000000000000000000000000000000000',

          price: '0.03189674161490340389',
          sell: {
            howMuch: '10',
            symbol: 'WETH-T',
          },
          buy: {
            howMuch: '313.511647074559155',
            symbol: 'MLN-T',
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
            symbol: 'WETH-T',
          },
          buy: {
            howMuch: '313.511647074559155',
            symbol: 'MLN-T',
          },
          type: 'buy',
          exchange: 'OASIS_DEX',
          exchangeContractAddress: '0xbED692938E714Da2a1d5407E5D99658F7D4c8079',
          isActive: true,
        },
      },
    ],
    sellEntries: [
      {
        volume: '287.842916446464847',
        order: {
          id:
            '96302967355552289024967882824636622547821090945630919770220103279947185869454',
          expiration: '1533890007',
          feeRecipient: '0x173a2467cece1f752eb8416e337d0f0b58cad795',
          makerFee: '0',
          takerFee: '0',
          salt:
            '96302967355552289024967882824636622547821090945630919770220103279947185869454',
          signature: {
            v: 28,
            r:
              '0x72bfb761e03106fb0fba6386534f28cf20a8c7ba334509931676e644b97cfcb8',
            s:
              '0x171c88605df1aa5f8b1801b320b49fb5fdfde11ea356954913065768da6fafbe',
          },
          maker: '0x000f93dd15be2fd9aa56100e81dc1fd580e8cef3',
          taker: '0x0000000000000000000000000000000000000000',

          price: '0.03474117106460000001',
          buy: {
            howMuch: '10',
            symbol: 'WETH-T',
          },
          sell: {
            howMuch: '287.842916446464847',
            symbol: 'MLN-T',
          },
          type: 'sell',
          exchange: 'ERC_DEX',
          exchangeContractAddress: '0x90fe2af704b34e0224bf2299c838e04d4dcf1364',
          isActive: true,
        },
      },
      {
        volume: '573.958775394250905',
        order: {
          id:
            '71419178349408508286422820083917115708971497327642429272764937832088207492971',
          expiration: '1533890017',
          feeRecipient: '0x173a2467cece1f752eb8416e337d0f0b58cad795',
          makerFee: '0',
          takerFee: '0',
          salt:
            '71419178349408508286422820083917115708971497327642429272764937832088207492971',
          signature: {
            v: 28,
            r:
              '0x00d84e8ea393d4170e7bb9c66fa46476d0bffddfbb36188c30841e2e5f8fafcc',
            s:
              '0x4b91651702c11f2dc8efdd6a76bff4a153e5cd6f3ec7aee592acac978cdf5eb8',
          },
          maker: '0x000f93dd15be2fd9aa56100e81dc1fd580e8cef3',
          taker: '0x0000000000000000000000000000000000000000',

          price: '0.03495087632253521127',
          buy: {
            howMuch: '10',
            symbol: 'WETH-T',
          },
          sell: {
            howMuch: '286.115858947786058',
            symbol: 'MLN-T',
          },
          type: 'sell',
          exchange: 'ERC_DEX',
          exchangeContractAddress: '0x90fe2af704b34e0224bf2299c838e04d4dcf1364',
          isActive: true,
        },
      },
      {
        volume: '856.90836226112585',
        order: {
          id:
            '269638644306083619498395204910965153249475175197150846272235434328185974335',
          expiration: '1533890033',
          feeRecipient: '0x173a2467cece1f752eb8416e337d0f0b58cad795',
          makerFee: '0',
          takerFee: '0',
          salt:
            '269638644306083619498395204910965153249475175197150846272235434328185974335',
          signature: {
            v: 28,
            r:
              '0x9ebcfb3d1149083618b14a4598a59b07bd7a55f2680f25110729504683f0f4be',
            s:
              '0x4107c7fa3aaf7b65afd9303caa104c0526dbd5567f9bf1d6a8506ee15c3643e9',
          },
          maker: '0x000f93dd15be2fd9aa56100e81dc1fd580e8cef3',
          taker: '0x0000000000000000000000000000000000000000',

          price: '0.03534198480630722275',
          buy: {
            howMuch: '10',
            symbol: 'WETH-T',
          },
          sell: {
            howMuch: '282.949586866874945',
            symbol: 'MLN-T',
          },
          type: 'sell',
          exchange: 'ERC_DEX',
          exchangeContractAddress: '0x90fe2af704b34e0224bf2299c838e04d4dcf1364',
          isActive: true,
        },
      },
      {
        volume: '1136.115991214196752',
        order: {
          id:
            '11237167879966232763183679966800023000333042005442680810034960123858343145310',
          expiration: '1533890049',
          feeRecipient: '0x173a2467cece1f752eb8416e337d0f0b58cad795',
          makerFee: '0',
          takerFee: '0',
          salt:
            '11237167879966232763183679966800023000333042005442680810034960123858343145310',
          signature: {
            v: 27,
            r:
              '0x7bd2faf08d912e7d1650b480cdf6badc6466f55e4bbbbd08c0e5247fbb664b1f',
            s:
              '0x64e318e79efd265bba4f0be945626233d573aae323d313d9bea3f929861f7497',
          },
          maker: '0x000f93dd15be2fd9aa56100e81dc1fd580e8cef3',
          taker: '0x0000000000000000000000000000000000000000',

          price: '0.03581564027278350511',
          buy: {
            howMuch: '10',
            symbol: 'WETH-T',
          },
          sell: {
            howMuch: '279.207628953070902',
            symbol: 'MLN-T',
          },
          type: 'sell',
          exchange: 'ERC_DEX',
          exchangeContractAddress: '0x90fe2af704b34e0224bf2299c838e04d4dcf1364',
          isActive: true,
        },
      },
      {
        volume: '1414.747934334374724',
        order: {
          id:
            '14154721986762677035650990823345620946275899562927278438693307924695347344745',
          expiration: '1533890069',
          feeRecipient: '0x173a2467cece1f752eb8416e337d0f0b58cad795',
          makerFee: '0',
          takerFee: '0',
          salt:
            '14154721986762677035650990823345620946275899562927278438693307924695347344745',
          signature: {
            v: 27,
            r:
              '0x84a74973981d2f02ca1f51b924bb9f85551ebad84e982b1a8f3529f945829493',
            s:
              '0x68d6621a788553ee962184f955dd9f97f85d075f214b6c3972ae192196cd5b97',
          },
          maker: '0x000f93dd15be2fd9aa56100e81dc1fd580e8cef3',
          taker: '0x0000000000000000000000000000000000000000',

          price: '0.03588963952954545454',
          buy: {
            howMuch: '10',
            symbol: 'WETH-T',
          },
          sell: {
            howMuch: '278.631943120177972',
            symbol: 'MLN-T',
          },
          type: 'sell',
          exchange: 'ERC_DEX',
          exchangeContractAddress: '0x90fe2af704b34e0224bf2299c838e04d4dcf1364',
          isActive: true,
        },
      },
      {
        volume: '1689.637919540748653',
        order: {
          id:
            '90624116958836631220516209284885658559310621026154292720396243182305185376953',
          expiration: '1533890085',
          feeRecipient: '0x173a2467cece1f752eb8416e337d0f0b58cad795',
          makerFee: '0',
          takerFee: '0',
          salt:
            '90624116958836631220516209284885658559310621026154292720396243182305185376953',
          signature: {
            v: 28,
            r:
              '0x9d6273c58a14a179b9facb2e924dfde44bbc30fc59c144f40b29ca5db1f164cd',
            s:
              '0x588885f4d7835ec15c535b456176d9584565a3ef8d9fb77b7c5c02bfbae0707a',
          },
          maker: '0x000f93dd15be2fd9aa56100e81dc1fd580e8cef3',
          taker: '0x0000000000000000000000000000000000000000',

          price: '0.03637818959643979057',
          buy: {
            howMuch: '10',
            symbol: 'WETH-T',
          },
          sell: {
            howMuch: '274.889985206373929',
            symbol: 'MLN-T',
          },
          type: 'sell',
          exchange: 'ERC_DEX',
          exchangeContractAddress: '0x90fe2af704b34e0224bf2299c838e04d4dcf1364',
          isActive: true,
        },
      },
      {
        volume: '1960.498103916872074',
        order: {
          id:
            '96984606670502401008398164020895826389427215450890718580579115369194040537072',
          expiration: '1533890104',
          feeRecipient: '0x173a2467cece1f752eb8416e337d0f0b58cad795',
          makerFee: '0',
          takerFee: '0',
          salt:
            '96984606670502401008398164020895826389427215450890718580579115369194040537072',
          signature: {
            v: 27,
            r:
              '0x2648712d6c303288705454d419488e079f05cc0c7ae667c74d9a2495b3f824ca',
            s:
              '0x57ccf2fe696a237da5904d31af88f6b63f5e626e2d52f2a2da4e9f2cdebfb449',
          },
          maker: '0x000f93dd15be2fd9aa56100e81dc1fd580e8cef3',
          taker: '0x0000000000000000000000000000000000000000',

          price: '0.03691941664675876728',
          buy: {
            howMuch: '10',
            symbol: 'WETH-T',
          },
          sell: {
            howMuch: '270.860184376123421',
            symbol: 'MLN-T',
          },
          type: 'sell',
          exchange: 'ERC_DEX',
          exchangeContractAddress: '0x90fe2af704b34e0224bf2299c838e04d4dcf1364',
          isActive: true,
        },
      },
      {
        volume: '2228.767702044977311',
        order: {
          id:
            '4604886630858074681010333900934157298352445667281895938132549745140729661927',
          expiration: '1533890121',
          feeRecipient: '0x173a2467cece1f752eb8416e337d0f0b58cad795',
          makerFee: '0',
          takerFee: '0',
          salt:
            '4604886630858074681010333900934157298352445667281895938132549745140729661927',
          signature: {
            v: 27,
            r:
              '0x102d578205eb350388dd237c9f22a4330b7068349fd1d59cc1ea755c29487fc4',
            s:
              '0x6a5b51dea2667542b8fa25c5877b0897548a665711ee105564b01430cea8b2f4',
          },
          maker: '0x000f93dd15be2fd9aa56100e81dc1fd580e8cef3',
          taker: '0x0000000000000000000000000000000000000000',

          price: '0.03727593461866952796',
          buy: {
            howMuch: '10',
            symbol: 'WETH-T',
          },
          sell: {
            howMuch: '268.269598128105237',
            symbol: 'MLN-T',
          },
          type: 'sell',
          exchange: 'ERC_DEX',
          exchangeContractAddress: '0x90fe2af704b34e0224bf2299c838e04d4dcf1364',
          isActive: true,
        },
      },
      {
        volume: '2493.58318517572497',
        order: {
          id:
            '53240587075232308532158794728103004523642036280233110642393823050523708831112',
          expiration: '1533890149',
          feeRecipient: '0x173a2467cece1f752eb8416e337d0f0b58cad795',
          makerFee: '0',
          takerFee: '0',
          salt:
            '53240587075232308532158794728103004523642036280233110642393823050523708831112',
          signature: {
            v: 28,
            r:
              '0x3721f05f8ece65e0c12aa76371d55de8eedb5fe80b114476ccda67f87233bc09',
            s:
              '0x3fcc3a9746e17bf62658f7ed2a44dd4e09e0b0ad2f021a42c608696762730b9a',
          },
          maker: '0x000f93dd15be2fd9aa56100e81dc1fd580e8cef3',
          taker: '0x0000000000000000000000000000000000000000',

          price: '0.03776214246152173917',
          buy: {
            howMuch: '10',
            symbol: 'WETH-T',
          },
          sell: {
            howMuch: '264.815483130747659',
            symbol: 'MLN-T',
          },
          type: 'sell',
          exchange: 'ERC_DEX',
          exchangeContractAddress: '0x90fe2af704b34e0224bf2299c838e04d4dcf1364',
          isActive: true,
        },
      },
      {
        volume: '2756.383767891347375',
        order: {
          id:
            '1233177404392475891618488288211937198800448430268037754937622680273608094462',
          expiration: '1533890161',
          feeRecipient: '0x173a2467cece1f752eb8416e337d0f0b58cad795',
          makerFee: '0',
          takerFee: '0',
          salt:
            '1233177404392475891618488288211937198800448430268037754937622680273608094462',
          signature: {
            v: 27,
            r:
              '0xe476f92dce1a86dd8d4da6bc22ec4a7c5ba3f1c3c4ad1db3057be53845205e39',
            s:
              '0x56d2f81ede95eecef8df906663035546cccbe29cfc7ea554b92b13c5774f9ce4',
          },
          maker: '0x000f93dd15be2fd9aa56100e81dc1fd580e8cef3',
          taker: '0x0000000000000000000000000000000000000000',

          price: '0.03805166600722891572',
          buy: {
            howMuch: '10',
            symbol: 'WETH-T',
          },
          sell: {
            howMuch: '262.800582715622405',
            symbol: 'MLN-T',
          },
          type: 'sell',
          exchange: 'ERC_DEX',
          exchangeContractAddress: '0x90fe2af704b34e0224bf2299c838e04d4dcf1364',
          isActive: true,
        },
      },
    ],
  },
  onClick: () => null,
};

describe('Orderbook', () => {
  const defaultElement = <Orderbook {...data} />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
