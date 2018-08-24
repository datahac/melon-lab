import React from 'react';
import RecentTrades from './index';

const data = {
  baseTokenSymbol: 'MLN-T',
  quoteTokenSymbol: 'WETH-T',
  trades: [
    {
      price: '0.0522',
      quantity: '191.4630',
      timestamp: '23. Jul 2018 14:59',
      type: 'sell',
    },
    {
      price: '0.0521',
      quantity: '192.0272',
      timestamp: '23. Jul 2018 14:59',
      type: 'sell',
    },
    {
      price: '0.0517',
      quantity: '193.4366',
      timestamp: '23. Jul 2018 16:22',
      type: 'sell',
    },
    {
      price: '0.0515',
      quantity: '194.2841',
      timestamp: '23. Jul 2018 19:47',
      type: 'sell',
    },
    {
      price: '0.0512',
      quantity: '195.1502',
      timestamp: '23. Jul 2018 19:47',
      type: 'sell',
    },
    {
      price: '0.0512',
      quantity: '195.2951',
      timestamp: '23. Jul 2018 19:47',
      type: 'sell',
    },
    {
      price: '0.0512',
      quantity: '195.3698',
      timestamp: '23. Jul 2018 19:48',
      type: 'sell',
    },
    {
      price: '0.0512',
      quantity: '195.4102',
      timestamp: '23. Jul 2018 19:48',
      type: 'sell',
    },
    {
      price: '0.0512',
      quantity: '195.4146',
      timestamp: '23. Jul 2018 21:51',
      type: 'sell',
    },
    {
      price: '0.0512',
      quantity: '195.4281',
      timestamp: '23. Jul 2018 21:51',
      type: 'sell',
    },
    {
      price: '0.0512',
      quantity: '195.4735',
      timestamp: '23. Jul 2018 21:51',
      type: 'sell',
    },
    {
      price: '0.0511',
      quantity: '195.5459',
      timestamp: '23. Jul 2018 21:51',
      type: 'sell',
    },
    {
      price: '0.0511',
      quantity: '195.5852',
      timestamp: '23. Jul 2018 21:52',
      type: 'sell',
    },
    {
      price: '0.0511',
      quantity: '195.5956',
      timestamp: '23. Jul 2018 21:52',
      type: 'sell',
    },
    {
      price: '0.0511',
      quantity: '195.6337',
      timestamp: '23. Jul 2018 21:52',
      type: 'sell',
    },
    {
      price: '0.0511',
      quantity: '195.6615',
      timestamp: '23. Jul 2018 21:52',
      type: 'sell',
    },
    {
      price: '0.0511',
      quantity: '195.6889',
      timestamp: '23. Jul 2018 22:46',
      type: 'sell',
    },
    {
      price: '0.0511',
      quantity: '195.7426',
      timestamp: '23. Jul 2018 22:47',
      type: 'sell',
    },
    {
      price: '0.0511',
      quantity: '195.7552',
      timestamp: '23. Jul 2018 22:47',
      type: 'sell',
    },
    {
      price: '0.0511',
      quantity: '195.7622',
      timestamp: '23. Jul 2018 22:47',
      type: 'sell',
    },
    {
      price: '0.0511',
      quantity: '195.8318',
      timestamp: '23. Jul 2018 22:47',
      type: 'sell',
    },
    {
      price: '0.0511',
      quantity: '195.8684',
      timestamp: '23. Jul 2018 22:48',
      type: 'sell',
    },
    {
      price: '0.0511',
      quantity: '195.8775',
      timestamp: '23. Jul 2018 22:48',
      type: 'sell',
    },
    {
      price: '0.0510',
      quantity: '195.8963',
      timestamp: '23. Jul 2018 22:48',
      type: 'sell',
    },
    {
      price: '0.0510',
      quantity: '195.9459',
      timestamp: '24. Jul 2018 00:18',
      type: 'sell',
    },
    {
      price: '0.0510',
      quantity: '195.9568',
      timestamp: '24. Jul 2018 00:18',
      type: 'sell',
    },
    {
      price: '0.0510',
      quantity: '195.9628',
      timestamp: '24. Jul 2018 00:19',
      type: 'sell',
    },
    {
      price: '0.0510',
      quantity: '195.9792',
      timestamp: '24. Jul 2018 00:19',
      type: 'sell',
    },
    {
      price: '0.0510',
      quantity: '195.9960',
      timestamp: '24. Jul 2018 00:19',
      type: 'sell',
    },
    {
      price: '0.0510',
      quantity: '196.0429',
      timestamp: '24. Jul 2018 00:19',
      type: 'sell',
    },
    {
      price: '0.0510',
      quantity: '196.0529',
      timestamp: '24. Jul 2018 00:20',
      type: 'sell',
    },
    {
      price: '0.0510',
      quantity: '196.1009',
      timestamp: '24. Jul 2018 00:20',
      type: 'sell',
    },
    {
      price: '0.0510',
      quantity: '196.1103',
      timestamp: '24. Jul 2018 03:25',
      type: 'sell',
    },
    {
      price: '0.0510',
      quantity: '196.1177',
      timestamp: '24. Jul 2018 03:25',
      type: 'sell',
    },
    {
      price: '0.0510',
      quantity: '196.1329',
      timestamp: '24. Jul 2018 03:25',
      type: 'sell',
    },
    {
      price: '0.0510',
      quantity: '196.1439',
      timestamp: '24. Jul 2018 03:25',
      type: 'sell',
    },
    {
      price: '0.0510',
      quantity: '196.1477',
      timestamp: '24. Jul 2018 03:26',
      type: 'sell',
    },
    {
      price: '0.0510',
      quantity: '196.1824',
      timestamp: '24. Jul 2018 03:26',
      type: 'sell',
    },
    {
      price: '0.0510',
      quantity: '196.1826',
      timestamp: '24. Jul 2018 03:26',
      type: 'sell',
    },
    {
      price: '0.0509',
      quantity: '196.3219',
      timestamp: '24. Jul 2018 03:26',
      type: 'sell',
    },
    {
      price: '0.0509',
      quantity: '196.3461',
      timestamp: '24. Jul 2018 04:54',
      type: 'sell',
    },
    {
      price: '0.0509',
      quantity: '196.3796',
      timestamp: '24. Jul 2018 04:55',
      type: 'sell',
    },
    {
      price: '0.0509',
      quantity: '196.3968',
      timestamp: '24. Jul 2018 04:55',
      type: 'sell',
    },
    {
      price: '0.0509',
      quantity: '196.4054',
      timestamp: '24. Jul 2018 04:55',
      type: 'sell',
    },
    {
      price: '0.0509',
      quantity: '196.4496',
      timestamp: '24. Jul 2018 04:55',
      type: 'sell',
    },
    {
      price: '0.0509',
      quantity: '196.4975',
      timestamp: '24. Jul 2018 04:56',
      type: 'sell',
    },
    {
      price: '0.0509',
      quantity: '196.5006',
      timestamp: '24. Jul 2018 04:56',
      type: 'sell',
    },
    {
      price: '0.0509',
      quantity: '196.5245',
      timestamp: '24. Jul 2018 04:56',
      type: 'sell',
    },
    {
      price: '0.0509',
      quantity: '196.5297',
      timestamp: '24. Jul 2018 06:00',
      type: 'sell',
    },
    {
      price: '0.0509',
      quantity: '196.6486',
      timestamp: '24. Jul 2018 06:01',
      type: 'sell',
    },
    {
      price: '0.0508',
      quantity: '196.6733',
      timestamp: '24. Jul 2018 06:01',
      type: 'sell',
    },
    {
      price: '0.0508',
      quantity: '196.7271',
      timestamp: '24. Jul 2018 06:01',
      type: 'sell',
    },
    {
      price: '0.0508',
      quantity: '196.7375',
      timestamp: '24. Jul 2018 06:01',
      type: 'sell',
    },
    {
      price: '0.0508',
      quantity: '196.8085',
      timestamp: '24. Jul 2018 06:02',
      type: 'sell',
    },
    {
      price: '0.0508',
      quantity: '196.8284',
      timestamp: '24. Jul 2018 06:02',
      type: 'sell',
    },
    {
      price: '0.0508',
      quantity: '196.8811',
      timestamp: '24. Jul 2018 06:02',
      type: 'sell',
    },
    {
      price: '0.0508',
      quantity: '196.8961',
      timestamp: '24. Jul 2018 08:06',
      type: 'sell',
    },
    {
      price: '0.0508',
      quantity: '196.9129',
      timestamp: '24. Jul 2018 08:06',
      type: 'sell',
    },
    {
      price: '0.0508',
      quantity: '196.9297',
      timestamp: '24. Jul 2018 08:07',
      type: 'sell',
    },
    {
      price: '0.0508',
      quantity: '196.9672',
      timestamp: '24. Jul 2018 08:07',
      type: 'sell',
    },
    {
      price: '0.0508',
      quantity: '196.9705',
      timestamp: '24. Jul 2018 08:07',
      type: 'sell',
    },
    {
      price: '0.0508',
      quantity: '196.9835',
      timestamp: '24. Jul 2018 08:08',
      type: 'sell',
    },
    {
      price: '0.0508',
      quantity: '197.0196',
      timestamp: '24. Jul 2018 08:08',
      type: 'sell',
    },
    {
      price: '0.0507',
      quantity: '197.0460',
      timestamp: '24. Jul 2018 08:08',
      type: 'sell',
    },
  ],
};

describe('RecentTrades', () => {
  const defaultElement = <RecentTrades {...data} />;
  let customElement;

  it('should render correctly without trades', () => {
    customElement = <RecentTrades {...data} trades={[]} />;
    const wrapper = shallow(customElement);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
