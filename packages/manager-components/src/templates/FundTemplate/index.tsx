import React from 'react';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import Headline from '~/blocks/Headline';
import Layout from '~/design/Layout';

import styles from './styles.css';

const Fund = ({
  FactSheet,
  FactSheetProps,
  Holdings,
  HoldingsProps,
  OrderForm,
  OrderFormProps,
  OrderBook,
  OrderBookProps,
  OpenOrders,
  OpenOrdersProps,
  RecentTrades,
  RecentTradesProps,
  HeaderProps = {},
  HeadlineProps,
}) => {
  return (
    <Layout>
      <div className="fund-template">
        <style jsx>{styles}</style>
        {HeaderProps && (
          <div className="fund-template__header">
            <Header {...HeaderProps} />
          </div>
        )}

        <div className="fund-template__content-wrap">
          {HeadlineProps && (
            <div className="fund-template__title">
              <Headline {...HeadlineProps} />
            </div>
          )}
          <div className="fund-template__content">
            <div className="fund-template__info">
              <div className="fund-template__info-item">
                <FactSheet {...FactSheetProps} />
              </div>
            </div>
            <div className="fund-template__holdings">
              <Holdings {...HoldingsProps} />
            </div>
            <div className="fund-template__order">
              <div className="fund-template__order-book" id="orderbook">
                <OrderBook {...OrderBookProps} />
              </div>
              <div className="fund-template__order-form" id="trade">
                <OrderForm {...OrderFormProps} />
              </div>
            </div>
            <div className="fund-template__open-orders">
              <OpenOrders {...OpenOrdersProps} />
            </div>
            <div className="fund-template__recent-trades">
              <RecentTrades {...RecentTradesProps} />
            </div>
          </div>
        </div>

        <div className="fund-template__footer">
          <Footer />
        </div>
      </div>
    </Layout>
  );
};

export default Fund;
