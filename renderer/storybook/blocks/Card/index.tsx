import classNames from 'classnames';
import React, { StatelessComponent } from 'react';
import format from 'date-fns/format';
import displayPrice from '~/shared/utils/displayPrice';
import Link from '~/blocks/Link';
import Icons from '~/design/Icons';
import * as Tm from '@melonproject/token-math';

import styles from './styles.css';
import displayQuantity from '~/shared/utils/displayQuantity';

export interface CardProps {
  inception?: string;
  isActive?: boolean;
  name?: string;
  rank?: number;
  sharePrice?: Tm.PriceInterface;
  onClick?: React.MouseEventHandler;
  decimals?: number;
}

const Card: StatelessComponent<CardProps> = ({
  inception,
  isActive,
  name,
  gav,
  rank,
  version,
  sharePrice,
  onClick,
  decimals = 4,
}) => {
  const cardClassNames = classNames('card', {
    'card--active': isActive,
  });

  return (
    <div onClick={onClick} className={cardClassNames}>
      <style jsx>{styles}</style>
      <div className="card__rank">
        <span className="card__rank-symbol">#</span>
        {rank}
      </div>
      <div className="card__info-cell">
        <div className="card__info-wrap">
          <div className="card__name">{name}</div>
          <div className="card__info">
            <div className="card__share-price">
              <span className="card__label">Share price</span>{' '}
              {sharePrice && displayPrice(sharePrice, decimals)}
            </div>
            <div className="card__aum">
              <span className="card__label">AUM</span>{' '}
              {gav && displayQuantity(gav, decimals)}
            </div>
            <div className="card__inception-date">
              <span className="card__label">Inception Date</span>{' '}
              {format(inception, 'DD. MMM YYYY HH:mm')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
