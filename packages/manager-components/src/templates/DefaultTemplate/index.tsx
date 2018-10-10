import React from 'react';
import Footer from '~/components/Footer';
import Headline from '~/blocks/Headline';
import Layout from '~/design/Layout';

import styles from './styles.css';

const DefaultTemplate = ({
  Header,
  HeaderProps = {},
  HeadlineProps,
  children,
}) => {
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
          <div className="default-template__content">{children}</div>
        </div>

        <div className="default-template__footer">
          <Footer />
        </div>
      </div>
    </Layout>
  );
};

export default DefaultTemplate;
