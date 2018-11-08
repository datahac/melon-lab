import React from 'react';
import Form from './';
import FeeForm from './container';

const onSubmit = jest.fn();
const onCancel = jest.fn();

const data = {
  fees: [
    {
      description: 'Estimated max gas cost',
      gasLimit: 30000,
      gasPrice: '20',
      gasTotal: '0.0006',
    },
    {
      description: 'Estimated max gas cost',
      gasLimit: 30000,
      gasPrice: '20',
      gasTotal: '0.0006',
    },
  ],
  initialValues: {
    gasPrice: '20.000',
  },
  onSubmit,
  onCancel,
};

describe('FeeForm', () => {
  const defaultElement = <FeeForm {...data} />;
  let tree;

  beforeEach(() => {
    tree = mount(defaultElement);
  });

  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('should submit the form if valid', async () => {
    tree.setProps({ initialValues: { gasPrice: '0.5000' } });
    await tree
      .find(Form)
      .props()
      .submitForm();
    expect(onSubmit).toHaveBeenCalledWith({ gasPrice: '0.5000' });
  });

  it('should call onCancel event', () => {
    tree
      .find(Form)
      .find('Button')
      .first()
      .simulate('click');
    expect(onCancel).toHaveBeenCalled();
  });
});
