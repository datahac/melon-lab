import React from 'react';
import Checkbox from './index';

const data = {
  name: 'name',
  value: 'value',
  text: 'Text',
};

describe('Checkbox', () => {
  const defaultElement = <Checkbox {...data} />;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
