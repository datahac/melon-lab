import React from 'react';
import Dropdown from './index';

const data = {
  name: 'name',
  label: 'label',
  options: [{ value: 'one', name: 'One' }, { value: 'two', name: 'Two' }],
  onChange: () => null,
};

describe('Dropdown', () => {
  const defaultElement = <Dropdown {...data} />;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should pass a selected value to the onChange handler', () => {
    const onChange = jest.fn();
    wrapper.setProps({ onChange });

    expect(wrapper).toMatchSnapshot();
    wrapper.find('select').simulate('change', { target: { value: 'value' } });
    expect(onChange).toBeCalledWith(
      { value: 'value' },
      { target: { value: 'value' } },
    );
  });
});
