import React, { StatelessComponent } from 'react';
import classNames from 'classnames';

import styles from './styles.css';

export interface LayoutProps {
  noHeader: boolean;
}

const Layout: StatelessComponent<LayoutProps> = ({
  children,
  noHeader,
  Header,
  HeaderProps,
  Footer,
  FooterProps,
}) => {
  const layoutClassNames = classNames('layout', {
    'layout--no-header': noHeader,
  });

  return (
    <div className={layoutClassNames}>
      <style jsx>{styles}</style>
      {!noHeader && Header && <Header {...HeaderProps} />}

      <div className="layout__content">{children}</div>

      {Footer && <Footer {...FooterProps} />}
    </div>
  );
};

export default Layout;
