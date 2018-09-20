import React, { Fragment } from 'react';
import GetStarted from '../../containers/GetStarted';
import Ranking from '../../containers/Ranking';

const Overview = () => {
  return (
    <Fragment>
      <GetStarted isHome />
      <Ranking />
    </Fragment>
  );
};

export default Overview;
