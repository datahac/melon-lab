import React, { StatelessComponent } from 'react';
import Button from '~/blocks/Button';
// import Dropdown from '~/blocks/Dropdown';
import Form from '~/blocks/Form';
import Input from '~/blocks/Input';
import Notification from '~/blocks/Notification';
import Switch from '~/blocks/Switch';
import Toggle from '~/blocks/Toggle';
import OrderInfo from '~/components/OrderInfo';

import styles from './styles.css';

interface FormValues {
  exchange: string;
  type: string;
  price: string;
  quantity: string;
  strategy: string;
  total: string;
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
  info?: any;
  isCompetition?: boolean;
  isManager?: boolean;
  onChange?: React.ChangeEvent<any>;
  quoteAsset?: string;
  touched: any;
  type?: string;
  values: FormValues;
}

export const OrderForm: StatelessComponent<OrderFormProps> = ({
  baseAsset,
  priceFeedUp,
  decimals = 4,
  errors,
  exchanges,
  handleBlur,
  handleSubmit,
  info,
  isCompetition,
  isManager,
  onChange,
  quoteAsset,
  touched,
  values,
}) => {
  const isMarket = values.strategy === 'Market' ? true : false;
  const numberPlaceholder = (0).toFixed(decimals);

  return (
    <div className="order-form">
      <style jsx>{styles}</style>
      <h3>Trade</h3>
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
              isChecked={values.strategy === 'Market'}
              onChange={onChange}
            />
          </div>
          <div className="order-form__toggle">
            <Toggle
              name="strategy"
              value="Limit"
              text="Limit"
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
          <OrderInfo {...info} />
        </div>
        <div className="order-form__input">
          <Input
            value={values.price}
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
            value={values.quantity}
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
            value={values.total}
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
