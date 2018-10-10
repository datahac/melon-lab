import React from 'react';
import Header from '+/components/Header';
import Template from '~/templates/DefaultTemplate';

const DefaultLayout = ({ children, ...props }) => (
  <Template
    Header={Header}
    HeaderProps={{
      network: props.network,
      message: props.message,
      address: props.account,
      balances: {
        eth: props.eth,
        mln: props.mln,
      },
    }}
    HeadlineProps={
      props.title && {
        title: props.title,
        text: props.text,
        icon: props.icon,
      }
    }
  >
    {children}
  </Template>
);

export default DefaultLayout;
