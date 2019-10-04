import React from 'react';
import Form from './index';

describe('Form', () => {
  const defaultElement = <Form>Default form</Form>;
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(defaultElement);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
