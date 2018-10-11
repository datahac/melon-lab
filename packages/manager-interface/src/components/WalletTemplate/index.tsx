import React from 'react';
import Template from '~/templates/WalletTemplate';
import { withRouter } from 'next/router';

const WalletTemplate = ({
  children,
  network,
  message,
  account,
  eth,
  mln,
  title,
  text,
  icon,
  router,
}) => {
  return (
    <Template
      NavigationProps={
        account && {
          activePath: router.pathname,
          navigationItems: [
            {
              name: 'Overview',
              href: '/wallet/overview',
            },
            {
              name: 'Settings',
              href: '/wallet/settings',
            },
          ],
        }
      }
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
};

export default withRouter(WalletTemplate);
