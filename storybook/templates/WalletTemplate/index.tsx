import React from 'react';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import Navigation from '~/components/Navigation';
import Headline from '~/blocks/Headline';
import Layout from '~/design/Layout';

import styles from './styles.css';

const WalletTemplate = ({ HeaderProps = {}, HeadlineProps, FooterProps = {}, NavigationProps, children }) => {
  return (
    <Layout>
      <div className="default-template">
        <style jsx>{styles}</style>
        {HeaderProps && (
          <div className="default-template__header">
            <Header {...HeaderProps} />
          </div>
        )}

        <div className="default-template__content-wrap">
          {HeadlineProps && (
            <div className="default-template__title">
              <Headline {...HeadlineProps} />
            </div>
          )}

          {NavigationProps && (
            <div className="default-template__navigation">
              <Navigation {...NavigationProps} />
            </div>
          )}

          <div className="default-template__content">{children}</div>
        </div>

        <div className="default-template__footer">
          <Footer {...FooterProps} />
        </div>
      </div>
    </Layout>
  );
};

export default WalletTemplate;
