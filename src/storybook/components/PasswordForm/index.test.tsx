import React from 'react';
import Form from './';
import PasswordForm from './container';

const onSubmit = jest.fn();
const onCancel = jest.fn();

const data = {
  initialValues: {
    password: '',
  },
  onCancel,
  onSubmit,
};

describe('PasswordForm', () => {
  const defaultElement = <PasswordForm {...data} />;
  let tree;

  beforeEach(() => {
    tree = mount(defaultElement);
  });

  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('should submit the form if valid', async () => {
    tree.setProps({ initialValues: { password: 'password' } });
    await tree
      .find(Form)
      .props()
      .submitForm();
    expect(onSubmit).toHaveBeenCalledWith(
      { password: 'password' },
      'passwordForm',
    );
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
