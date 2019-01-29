import React from 'react';
import MultiDropdown from './index';

const data = {
  name: 'name',
  label: 'label',
  options: [{ value: 'one', name: 'One' }, { value: 'two', name: 'Two' }],
  onChange: () => null,
};

describe('MultiDropdown', () => {
  const defaultElement = <MultiDropdown {...data} />;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
