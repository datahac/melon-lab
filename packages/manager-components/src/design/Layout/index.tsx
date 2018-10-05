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
      <div className="layout__header">
        {!noHeader && Header && <Header {...HeaderProps} />}
      </div>

      <div className="layout__content">{children}</div>

      <div className="layout__footer">
        {Footer && <Footer {...FooterProps} />}
      </div>
    </div>
  );
};

export default Layout;
