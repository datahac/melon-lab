import React, { StatelessComponent, Fragment } from 'react';
import Button from '~/blocks/Button';
import Checkbox from '~/blocks/Checkbox';
import Form from '~/blocks/Form';
import Input from '~/blocks/Input';
import Modal from '~/blocks/Modal';
import Spinner from '~/blocks/Spinner';
import TermsConditions from '~/components/TermsConditions';
import Link from '~/blocks/Link';

import styles from './styles.css';
import Notification from '../../blocks/Notification/index';

interface FormValues {
  name: string;
}

export interface SetupProps {
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
  networkId?: string;
  touched?: any;
  values: FormValues;
  balances: {
    eth?: string;
    mln?: string;
  };
  address: string;
  fees?: any;
  FeeFormModal;
  FeeFormModalProps;
  TermsConditionsModal;
  TermsConditionsModalProps;
  availableExchanges: any;
}

export const Setup: StatelessComponent<SetupProps> = ({
  competitionName = 'Naxos',
  canonicalPriceFeedAddress,
  competitionComplianceAddress,
  noComplianceAddress,
  errors,
  handleBlur,
  handleChange,
  handleSubmit,
  isCompetition,
  loading,
  networkId,
  touched,
  values,
  balances,
  address,
  FeeFormModal,
  FeeFormModalProps = {},
  TermsConditionsModal,
  TermsConditionsModalProps = {},
  availableExchanges,
}) => (
  <div className="setup">
    <style jsx>{styles}</style>

    {TermsConditionsModal && (
      <TermsConditionsModal {...TermsConditionsModalProps} />
    )}

    {FeeFormModal && <FeeFormModal {...FeeFormModalProps} />}

    {loading ? (
      <Spinner
        icon
        size="small"
        text="Deploying your fund to the Ethereum blockchain..."
      />
    ) : (
      <Fragment>
        {balances && balances.eth === '0' ? (
          <Notification isWarning>
            <b>Insufficient ETH Balance</b>
            <p>
              You don't have enough Kovan Ether or Kovan W-ETH. Current
              balances: {balances.eth} ETH
              <br />
              To get started, head to our faucet to receive Kovan Ether and
              Kovan Melon
              <br />
              Once you have received ETH-T and MLN-T, go ahead and create your
              Melon fund.
            </p>

            <Link
              target="_blank"
              style="secondary"
              size="medium"
              href={`https://faucet.melon.fund/?address=${address}`}
            >
              Go to faucet
            </Link>
          </Notification>
        ) : (
          <Form onSubmit={handleSubmit}>
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
            <h4>Melon Default Configuration:</h4>
            <p>
              For this version, the modules that your fund will use are
              predefined ie. you do not need to choose a module. For your
              record, below are the predefined modules for this version.
            </p>
            <div className="setup__exchanges">
              <h4>Exchange:</h4>
              {availableExchanges &&
                availableExchanges.map(exchange => (
                  <div
                    key={exchange.value}
                    className="setup__exchanges-checkbox"
                  >
                    <Checkbox
                      name="exchanges"
                      value={exchange.value}
                      text={exchange.text}
                      disabled
                      defaultChecked
                    />
                  </div>
                ))}
            </div>
            <div className="setup__info">
              Pricefeed:{' '}
              <a
                href={`https://${
                  networkId === '42' ? 'kovan.' : ''
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
                      networkId === '42' ? 'kovan.' : ''
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
                      networkId === '42' ? 'kovan.' : ''
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
            <div className="setup__actions">
              <div className="setup__action">
                <Link
                  style="secondary"
                  size="medium"
                  href={{
                    pathname: '/wallet',
                  }}
                >
                  Cancel
                </Link>
              </div>
              <div className="setup__action">
                <Button type="submit" style="primary">
                  Create fund
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Fragment>
    )}
  </div>
);

export default Setup;
