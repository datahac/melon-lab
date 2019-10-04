import React from 'react';
import Form from './';
import RestoreWallet from './container';

const onSubmit = jest.fn();

const data = {
  initialValues: {
    mnemonic: '',
    password: '',
  },
  onSubmit,
  loading: false,
};

describe('RestoreWallet', () => {
  const defaultElement = <RestoreWallet {...data} />;
  let tree;

  beforeEach(() => {
    tree = mount(defaultElement);
  });

  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  xit('should submit the form if valid', async () => {
    tree.setProps({ initialValues: { mnemonic: 'mnemonic' } });
    await tree
      .find(Form)
      .props()
      .submitForm();
    expect(onSubmit).toHaveBeenCalledWith({ mnemonic: 'mnemonic' });
  });
});
