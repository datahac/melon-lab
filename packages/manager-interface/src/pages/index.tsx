import React from 'react';
import DefaultTemplate from '+/components/DefaultTemplate';
import Ranking from '+/components/Ranking';
import GetStarted from '+/components/GetStarted';

export default class RankingPage extends React.Component {
  render() {
    return (
      <DefaultTemplate>
        <GetStarted isHome />
        <Ranking />
      </DefaultTemplate>
    );
  }
}
