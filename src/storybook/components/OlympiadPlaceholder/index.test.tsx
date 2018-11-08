import React from 'react';
import OlympiadPlaceholder from './index';

const data = {};

describe('OlympiadPlaceholder', () => {
  const defaultElement = <OlympiadPlaceholder {...data} />;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
