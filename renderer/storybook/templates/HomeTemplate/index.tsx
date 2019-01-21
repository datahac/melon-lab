import React from 'react';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import Layout from '~/design/Layout';

import styles from './styles.css';

const HomeTemplate = ({
  GetStarted,
  GetStartedProps = {},
  Ranking,
  RankingProps = {},
  HeaderProps = {},
}) => {
  return (
    <Layout>
      <div className="home-template">
        <style jsx>{styles}</style>
        {HeaderProps && (
          <div className="home-template__header">
            <Header {...HeaderProps} />
          </div>
        )}

        <div className="home-template__content-wrap">
          {GetStartedProps && (
            <div className="home-template__title">
              <GetStarted {...GetStartedProps} />
            </div>
          )}
          <div className="home-template__content">
            <Ranking {...RankingProps} />
          </div>
        </div>

        <div className="home-template__footer">
          <Footer />
        </div>
      </div>
    </Layout>
  );
};

export default HomeTemplate;
