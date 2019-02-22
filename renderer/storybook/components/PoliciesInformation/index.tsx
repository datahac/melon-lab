import React, { StatelessComponent } from 'react';
import styles from './styles.css';
import Spinner from '~/blocks/Spinner';

export interface PoliciesInformationProps {
  policies: any;
  loading: boolean;
}

export const PoliciesInformation: StatelessComponent<PoliciesInformationProps> = ({
  policies,
  loading,
}) => {
  return (
    <div className="policies">
      <style jsx>{styles}</style>
      
      {loading && (
        <div className="policies__spinner">
          <Spinner icon size="small" />
        </div>
      )}

      {!loading && !policies.length && (
        <p className="policies__no-items">No registered policies</p>
      )}

      {!loading && !!policies.length && (
        <div className="policies__list">
          {policies.map(policy => (
            <div key={policy.name}>{policy.name}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PoliciesInformation;
