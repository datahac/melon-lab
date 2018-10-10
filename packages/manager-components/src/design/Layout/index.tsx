import React, { StatelessComponent } from 'react';

import styles from './styles.css';

const Layout: StatelessComponent<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <style jsx>{styles}</style>
      {children}
    </div>
  );
};

export default Layout;
