import React, { StatelessComponent } from 'react';
import format from 'date-fns/format';
import styles from './styles.css';

const Footer: StatelessComponent = ({ priceFeedUpdate }) => (
  <div className="footer">
    <style jsx>{styles}</style>
    <span className="footer__item">
      <a
        className="footer__item-link"
        href="https://github.com/melonproject/melon-lab/issues"
        target="_blank"
        rel="noopener noreferrer"
      >
        Report an issue
      </a>
    </span>
    <span className="footer__item">
      <a
        className="footer__item-link"
        href="https://www.melonport.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Melonport
      </a>
    </span>
    {priceFeedUpdate && (
      <span className="footer__item">
        Last pricefeed update:{' '}
        {format(priceFeedUpdate * 1000, 'DD. MMM YYYY HH:mm')}
      </span>
    )}
  </div>
);

export default Footer;
