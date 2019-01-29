import React from 'react';
import OpenOrders from '~/components/OpenOrders';
import { OpenOrdersQuery } from './data/openOrders';
import * as R from 'ramda';
import CancelOrder from '+/components/CancelOrder';

export default class OpenOrdersContainer extends React.Component {
  state = { selectedOrder: null };

  setSelectedOrder = selectedOrder => {
    this.setState({ selectedOrder });
  };

  render() {
    return (
      <OpenOrdersQuery fundAddress={this.props.address}>
        {props => (
          <React.Fragment>
            <OpenOrders
              canInteract={this.props.canInteract}
              isManager={this.props.isManager}
              orders={R.pathOr([], ['data', 'openOrders'], props)}
              onClick={orderId =>
                this.setSelectedOrder({
                  id: orderId,
                })
              }
            />
            <CancelOrder
              values={this.state.selectedOrder}
              unset={() => this.setSelectedOrder(null)}
            />
          </React.Fragment>
        )}
      </OpenOrdersQuery>
    );
  }
}
