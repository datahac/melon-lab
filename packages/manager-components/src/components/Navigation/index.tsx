import React, { StatelessComponent } from 'react';
import Link from '~/link';
import classNames from 'classnames';

import styles from './styles.css';

export interface NavigationProps {
  navigationItems?: Array<{
    name?: string;
    href?: string;
  }>;
  activePath?: string;
}

const Navigation: StatelessComponent<NavigationProps> = ({
  navigationItems,
  activePath,
}) => {
  const navigationItemClassNames = active =>
    classNames('navigation__item', {
      'navigation__item--active': active,
    });

  return (
    <div className="navigation">
      <style jsx>{styles}</style>
      <ul className="navigation__list">
        {navigationItems &&
          navigationItems.map(item => (
            <li
              key={item.name}
              className={navigationItemClassNames(item.href === activePath)}
            >
              <Link href={item.href} passHref>
                <a className="navigation__link">{item.name}</a>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Navigation;
