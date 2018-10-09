import React, { StatelessComponent } from 'react';
import classNames from 'classnames';

import styles from './styles.css';

export interface LayoutProps {
  noHeader: boolean;
  Header;
  HeaderProps;
  Footer;
  FooterProps;
  Headline;
  HeadlineProps;
}

const Layout: StatelessComponent<LayoutProps> = ({
  children,
  noHeader,
  Header,
  HeaderProps = {},
  Footer,
  FooterProps = {},
  Headline,
  HeadlineProps = {},
}) => {
  const layoutClassNames = classNames('layout', {
    'layout--no-header': noHeader,
  });

  return (
    <div className={layoutClassNames}>
      <style jsx>{styles}</style>
      {!noHeader &&
        Header && (
          <div className="layout__header">
            <Header {...HeaderProps} />
          </div>
        )}

      <div className="layout__content-wrap">
        {HeadlineProps.title && (
          <div className="layout__title">
            <Headline {...HeadlineProps} />
          </div>
        )}

        <div className="layout__content">{children}</div>
      </div>

      {Footer && (
        <div className="layout__footer">
          <Footer {...FooterProps} />
        </div>
      )}
    </div>
  );
};

export default Layout;
