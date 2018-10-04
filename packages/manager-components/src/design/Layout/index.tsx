import React from 'react';
import classNames from 'classnames';

import styles from './styles.css';

const Layout = ({
  children,
  noHeader,
  Header,
  HeaderProps,
  Footer,
  FooterProps,
}) => {
  const layoutClassNames = classNames('layout', {
    "layout--no-header": noHeader,
  });

  return (
    <div className={layoutClassNames}>
      <style jsx>{styles}</style>
      {!noHeader && <Header {...HeaderProps} />}

      <div className="layout__content">{children}</div>

      <Footer {...FooterProps} />
    </div>
  );
};

export default Layout;
