import React from 'react';
import RadioButton from './index';

const data = {
  name: 'name',
  value: 'value',
  text: 'Text',
};

describe('RadioButton', () => {
  const defaultElement = <RadioButton {...data} />;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
