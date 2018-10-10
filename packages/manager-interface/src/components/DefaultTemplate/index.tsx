import React from 'react';
import Header from '+/components/Header';
import Template from '~/templates/DefaultTemplate';

const DefaultLayout = ({
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
    Header={Header}
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

export default DefaultLayout;
