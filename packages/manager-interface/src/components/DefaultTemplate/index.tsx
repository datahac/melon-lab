import React from 'react';
import Template from '~/templates/DefaultTemplate';

const DefaultTemplate = ({
  children,
  network,
  message,
  account,
  eth,
  mln,
  title,
  text,
  icon,
}) => (
  <Template
    HeaderProps={{
      network,
      message,
      address: account,
      balances: {
        eth,
        mln,
      },
    }}
    HeadlineProps={
      title && {
        title,
        text,
        icon,
      }
    }
  >
    {children}
  </Template>
);

export default DefaultTemplate;
