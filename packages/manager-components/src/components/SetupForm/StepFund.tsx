import React, { StatelessComponent } from 'react';
import Input from '~/blocks/Input';
import Selector from '~/components/Selector';

import styles from './styles.css';

interface FormValues {
  name: string;
  exchanges: any;
}

export interface StepNameProps {
  competitionName?: string;
  canonicalPriceFeedAddress: string;
  competitionComplianceAddress: string;
  noComplianceAddress: string;
  errors?: any;
  handleBlur?: () => void;
  handleChange?: () => void;
  handleSubmit?: () => void;
  isCompetition?: boolean;
  network?: string;
  touched?: any;
  values: FormValues;
  address: string;
  availableExchangeContracts;
  onChangeExchanges;
}

export const StepName: StatelessComponent<StepNameProps> = ({
  competitionName = 'Naxos',
  canonicalPriceFeedAddress,
  competitionComplianceAddress,
  noComplianceAddress,
  errors,
  handleBlur,
  handleChange,
  isCompetition,
  network,
  touched,
  values,
  availableExchangeContracts,
  onChangeExchanges,
}) => {
  return (
    <div className="setup__step">
      <style jsx>{styles}</style>
      <h3>Fund</h3>
      <Input
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
        required={true}
        name="name"
        type="text"
        placeholder="Fund name"
        error={touched.name && errors.name}
      />

      <h4>Exchanges</h4>
      <Selector
        errors={touched.exchanges && errors.exchanges}
        onChange={onChangeExchanges}
        availableItems={availableExchangeContracts}
        selectedItems={values.exchanges}
      />
      <div className="setup-form__info">
        Pricefeed:{' '}
        <a
          href={`https://${
            network === 'KOVAN' ? 'kovan.' : ''
          }etherscan.io/address/${canonicalPriceFeedAddress}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>Canonical PriceFeed</strong>
        </a>
        <br />
        Asset Registrar: <strong>Melon {competitionName} Asset Universe</strong>
        {isCompetition ? (
          <div>
            Compliance (invest/redeem):{' '}
            <a
              href={`https://${
                network === 'KOVAN' ? 'kovan.' : ''
              }etherscan.io/address/${competitionComplianceAddress}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>
                Only {competitionName} contribution contract can invest
              </strong>
            </a>
          </div>
        ) : (
          <div>
            Compliance (invest/redeem):{' '}
            <a
              href={`https://${
                network === 'KOVAN' ? 'kovan.' : ''
              }etherscan.io/address/${noComplianceAddress}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>No compliance - anyone can invest (in WETH)</strong>
            </a>
          </div>
        )}
        Risk Management: <strong>Disabled (all trades allowed)</strong>
      </div>
    </div>
  );
};

export default StepName;
