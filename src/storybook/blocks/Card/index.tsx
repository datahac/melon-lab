import classNames from 'classnames';
import React, { StatelessComponent } from 'react';
import format from 'date-fns/format';
import displayPrice from '~/utils/displayPrice';
import Link from '~/blocks/Link';
import Icon from '~/blocks/Icon';

import styles from './styles.css';

export interface CardProps {
  inception?: string;
  isActive?: boolean;
  name?: string;
  rank?: number;
  sharePrice?: string;
  reportUrl?: string;
  onClick?: React.MouseEventHandler;
  decimals?: number;
}

const Card: StatelessComponent<CardProps> = ({
  inception,
  isActive,
  name,
  rank,
  sharePrice,
  reportUrl,
  onClick,
  decimals = 4,
}) => {
  const cardClassNames = classNames('card', {
    'card--active': isActive,
  });

  const handleReportClick = e => e.stopPropagation();

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
            <div className="card__inception-date">
              <span className="card__label">Inception Date</span>{' '}
              {format(inception, 'DD. MMM YYYY HH:mm')}
            </div>
          </div>
          <div className="card__report" onClick={handleReportClick}>
            <Link target="_blank" href={reportUrl} title="Show Report">
              <Icon width="16px" height="20px" name="icons_report" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
