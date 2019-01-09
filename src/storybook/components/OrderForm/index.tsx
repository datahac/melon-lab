import React, { StatelessComponent } from 'react';
import Button from '~/blocks/Button';
// import Dropdown from '~/blocks/Dropdown';
import Form from '~/blocks/Form';
import Input from '~/blocks/Input';
import Notification from '~/blocks/Notification';
import Switch from '~/blocks/Switch';
import Toggle from '~/blocks/Toggle';
import OrderInfo from '~/components/OrderInfo';
import { toFixed, QuantityInterface } from '@melonproject/token-math/quantity';
import {
  toFixed as toFixedPrice,
  PriceInterface,
} from '@melonproject/token-math/price';

import styles from './styles.css';

interface FormValues {
  exchange: string;
  type: string;
  strategy: string;
  price: PriceInterface;
  quantity: QuantityInterface;
  total: QuantityInterface;
}

export interface OrderFormProps {
  baseAsset?: string;
  priceFeedUp?: boolean;
  decimals?: number;
  errors: any;
  exchanges: Array<{
    name: string;
    label: string;
  }>;
  handleBlur?: () => void;
  handleSubmit?: () => void;
  tokens?: {
    baseToken: QuantityInterface;
    quoteToken: QuantityInterface;
  };
  isCompetition?: boolean;
  isManager?: boolean;
  onChange?: React.ChangeEvent<any>;
  quoteAsset?: string;
  touched: any;
  type?: string;
  values: FormValues;
  lastPrice: PriceInterface;
  ask: PriceInterface;
  bid: PriceInterface;
}

export const OrderForm: StatelessComponent<OrderFormProps> = ({
  baseAsset,
  priceFeedUp,
  decimals = 4,
  errors,
  exchanges,
  handleBlur,
  handleSubmit,
  tokens,
  isCompetition,
  isManager,
  onChange,
  quoteAsset,
  touched,
  values,
  lastPrice,
  ask,
  bid,
}) => {
  const isMarket = values.strategy === 'Market' ? true : false;
  const numberPlaceholder = (0).toFixed(decimals);

  return (
    <div className="order-form">
      <style jsx>{styles}</style>
      <Form onSubmit={handleSubmit}>
        {!priceFeedUp && (
          <Notification isWarning>
            Trading not possible when price feed down
          </Notification>
        )}
        <div className="order-form__toggles">
          <div className="order-form__toggle">
            <Toggle
              name="strategy"
              value="Market"
              text="Market"
              disabled={!isManager}
              isChecked={values.strategy === 'Market'}
              onChange={onChange}
            />
          </div>
          <div className="order-form__toggle">
            <Toggle
              name="strategy"
              value="Limit"
              text="Limit"
              disabled={!isManager}
              isChecked={values.strategy === 'Limit'}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="order-form__switch">
          <Switch
            options={[baseAsset, quoteAsset]}
            labels={['Buy', 'Sell']}
            onChange={onChange}
            name="type"
            value={values.type}
            isChecked={values.type === 'sell' ? true : false}
            disabled={isMarket || !priceFeedUp || !isManager}
          />
        </div>
        {/* <div className="order-form__dropdown">
          <Dropdown
            name="exchange"
            value={values.exchange}
            options={exchanges}
            label="Exchange"
            onChange={onChange}
            disabled={isMarket || !priceFeedUp}
          />
        </div> */}
        <div className="order-form__order-info">
          <OrderInfo
            tokens={tokens}
            lastPrice={lastPrice}
            ask={ask}
            bid={bid}
          />
        </div>
        <div className="order-form__input">
          <Input
            value={values.price && toFixedPrice(values.price, decimals)}
            disabled={isMarket || !priceFeedUp || !isManager}
            label="Price"
            name="price"
            insideLabel="true"
            placeholder={numberPlaceholder}
            decimals={decimals}
            onChange={onChange}
            onBlur={handleBlur}
            required={true}
            formatNumber={true}
            error={touched.price && errors.price}
          />
        </div>
        <div className="order-form__input">
          <Input
            value={values.quantity && toFixed(values.quantity, decimals)}
            label="Quantity"
            name="quantity"
            insideLabel="true"
            placeholder={numberPlaceholder}
            decimals={decimals}
            onChange={onChange}
            onBlur={handleBlur}
            required={true}
            formatNumber={true}
            error={touched.quantity && errors.quantity}
            disabled={(isMarket && !values.price) || !priceFeedUp || !isManager}
          />
        </div>
        <div className="order-form__input">
          <Input
            value={values.total && toFixed(values.total, decimals)}
            label="Total"
            name="total"
            insideLabel="true"
            placeholder={numberPlaceholder}
            decimals={decimals}
            onChange={onChange}
            onBlur={handleBlur}
            required={true}
            formatNumber={true}
            error={touched.total && errors.total}
            disabled={(isMarket && !values.price) || !priceFeedUp || !isManager}
          />
        </div>
        <Button
          disabled={(isMarket && !values.price) || !priceFeedUp || !isManager}
          type="submit"
        >
          {values.type === 'sell' ? 'Sell' : 'Buy'}
        </Button>
      </Form>
    </div>
  );
};

export default OrderForm;
