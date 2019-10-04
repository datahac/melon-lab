import React, { useState } from 'react';
import OpenOrders from '~/components/OpenOrders';
import { OpenOrdersQuery } from './data/openOrders';
import * as R from 'ramda';
import CancelOrder from '+/components/CancelOrder';

const OpenOrdersContainer = ({ address, canInteract, isManager }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <OpenOrdersQuery fundAddress={address}>
      {queryProps => (
        <React.Fragment>
          <OpenOrders
            canInteract={canInteract}
            isManager={isManager}
            loading={queryProps.loading}
            orders={R.pathOr([], ['data', 'openOrders'], queryProps)}
            onClick={setSelectedOrder}
          />
          <CancelOrder values={selectedOrder} setSelectedOrder={setSelectedOrder} />
        </React.Fragment>
      )}
    </OpenOrdersQuery>
  );
};

export default OpenOrdersContainer;
