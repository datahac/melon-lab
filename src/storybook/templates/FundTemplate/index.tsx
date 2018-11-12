import React from 'react';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import FundHeadline from '~/components/FundHeadline';
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
  FundHeadlineProps,
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
          {FundHeadlineProps && (
            <div className="fund-template__title">
              <FundHeadline {...FundHeadlineProps} />
            </div>
          )}
          <div className="fund-template__content">
            <div className="fund-template__info">
              <div className="fund-template__info-item">
                <FactSheet {...FactSheetProps} />
              </div>
            </div>
            <div className="fund-template__order">
              <div className="fund-template__holdings">
                <h3>Holdings</h3>
                <div className="fund-template__holdings-wrap">
                  <Holdings {...HoldingsProps} />
                </div>
              </div>
              <div className="fund-template__order-book" id="orderbook">
                <h3>
                  Orderbook for {OrderBookProps.baseAsset}/
                  {OrderBookProps.quoteAsset}
                </h3>
                <OrderBook {...OrderBookProps} />
              </div>
              <div className="fund-template__order-form" id="trade">
                <h3>Trade</h3>
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
