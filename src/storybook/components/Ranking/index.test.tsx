import React from 'react';
import Ranking from './index';

const mockCallback = jest.fn();
const mockCallbackFund = jest.fn();
const data = {
  rankingList: [
    {
      name: 'Black Turtle',
      address: '0x5bBA9263Ab1eA26FF9c0FeE3619e7AAf7C79E02b',
      inception: '26. Jul 2018 10:48',
      sharePrice: '1.0081',
      rank: 1,
    },
    {
      name: 'Quants',
      address: '0xFfDd0ae2efcBDb95fbCd189Fbb194708B3a3B3F9',
      inception: '24. Jul 2018 22:04',
      sharePrice: '1.0000',
      rank: 2,
    },
    {
      name: 'Titanium',
      address: '0xF1e9868Dc7b02AD30358476380Bfcb77A6c2e74e',
      inception: '26. Jul 2018 17:38',
      sharePrice: '1.0000',
      rank: 3,
    },
  ],
  associatedFund: '0x5bBA9263Ab1eA26FF9c0FeE3619e7AAf7C79E02b',
  search: '',
  ordering: '+rank',
  goToFund: mockCallbackFund,
  onFilterChange: () => null,
  setOrdering: mockCallback,
};

describe('Ranking', () => {
  const defaultElement = <Ranking {...data} />;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly when loading', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('onChange order event', () => {
    wrapper
      .find('Dropdown')
      .simulate('change', { target: undefined, value: '+rank' });
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0]).toBe('+rank');
    wrapper
      .find('Dropdown')
      .simulate('change', { target: undefined, value: '-rank' });
    expect(mockCallback.mock.calls.length).toBe(2);
    expect(mockCallback.mock.calls[1][0]).toBe('-rank');
  });

  it('onClick fund event', () => {
    wrapper
      .find('Card')
      .first()
      .simulate('click');
    expect(mockCallbackFund.mock.calls.length).toBe(1);
  });
});
