import React, { StatelessComponent } from 'react';
import Checkbox from '~/blocks/Checkbox';
import Form from '~/blocks/Form';
import Input from '~/blocks/Input';
import Link from '~/blocks/Link';
import Selector from '~/components/Selector';
import Wizard from '~/components/Wizard';
import TermsConditions from '~/components/TermsConditions';

import styles from './styles.css';

interface FormValues {
  name: string;
  exchanges: any;
  terms: boolean;
}

export interface SetupFormProps {
  competitionName?: string;
  canonicalPriceFeedAddress: string;
  competitionComplianceAddress: string;
  noComplianceAddress: string;
  errors?: any;
  handleBlur?: () => void;
  handleChange?: () => void;
  handleSubmit?: () => void;
  isCompetition?: boolean;
  loading?: boolean;
  network?: string;
  touched?: any;
  values: FormValues;
  address: string;
  availableExchangeContracts;
  onChangeExchanges;
  setPage;
  page;
  steps;
  onClickNext;
  onClickPrev;
  SetupForm;
  SetupFormProps;
}

export const SetupForm: StatelessComponent<SetupFormProps> = ({
  competitionName = 'Naxos',
  canonicalPriceFeedAddress,
  competitionComplianceAddress,
  noComplianceAddress,
  errors,
  handleBlur,
  handleChange,
  handleSubmit,
  isCompetition,
  network,
  touched,
  values,
  availableExchangeContracts,
  onChangeExchanges,
  setPage,
  page,
  steps,
  onClickNext,
  onClickPrev,
}) => {
  return (
    <Form>
      <style jsx>{styles}</style>

      <Wizard
        onClickNext={onClickNext}
        onClickPrev={onClickPrev}
        steps={steps}
        setPage={setPage}
        page={page}
        FirstAction={Link}
        FirstActionProps={{
          children: 'Cancel',
          style: 'secondary',
          size: 'medium',
          href: {
            pathname: '/wallet',
          },
        }}
        LastActionProps={{
          children: 'Create Fund',
          type: 'submit',
          onClick: handleSubmit,
          disabled: !values.terms,
        }}
      >
        <div className="setup-form__name">
          <h3>Name</h3>
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
            Asset Registrar:{' '}
            <strong>Melon {competitionName} Asset Universe</strong>
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
        <div className="setup-form__exchanges">
          <h3>Exchanges</h3>
          <Selector
            errors={touched.exchanges && errors.exchanges}
            onChange={onChangeExchanges}
            availableItems={availableExchangeContracts}
            selectedItems={values.exchanges}
          />
        </div>
        <div className="setup-form__policies">
          <h3>Risk Profile:</h3>
          <p>
            For this version, the modules that your fund will use are predefined
            ie. you do not need to choose a module. For your record, below are
            the predefined modules for this version.
          </p>
        </div>
        <div>
          <h3>Terms and Conditions</h3>
          <TermsConditions />
          <Checkbox
            onInputChange={handleChange}
            defaultChecked={values.terms}
            required={true}
            name="terms"
            text="I accept the terms and conditions"
            error={touched.terms && errors.terms}
          />
        </div>
      </Wizard>
    </Form>
  );
};

export default SetupForm;
