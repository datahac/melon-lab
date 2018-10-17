import React, { StatelessComponent, Fragment } from 'react';
import Button from '~/blocks/Button';
import Tile from '~/blocks/Tile';
import Form from '~/blocks/Form';
import Input from '~/blocks/Input';
import Spinner from '~/blocks/Spinner';
import Link from '~/blocks/Link';

import styles from './styles.css';
import Notification from '../../blocks/Notification/index';

interface FormValues {
  name: string;
  exchanges: any;
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
  network?: string;
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
  PolicyModalModal;
  PolicyModalModalProps;
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
  network,
  touched,
  values,
  balances,
  address,
  FeeFormModal,
  FeeFormModalProps = {},
  TermsConditionsModal,
  TermsConditionsModalProps = {},
  PolicyModal,
  PolicyModalProps = {},
  availableExchanges,
  setShowPolicyModal,
}) => (
  <div className="setup">
    <style jsx>{styles}</style>

    {TermsConditionsModal && (
      <TermsConditionsModal {...TermsConditionsModalProps} />
    )}

    {FeeFormModal && <FeeFormModal {...FeeFormModalProps} />}

    {PolicyModal && <PolicyModal {...PolicyModalProps} />}

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
              <h4>Risk Profile:</h4>

              <Tile
                active={values.exchanges.length > 0}
                error={errors.exchanges}
                onClick={() => setShowPolicyModal('exchangeSelector')}
              >
                <b>Allowed Exchnages:</b>{' '}
                {values.exchanges.length > 0
                  ? values.exchanges.map(exchange => (
                      <span
                        className="setup__selected-exchange"
                        key={`list-${exchange}`}
                      >
                        {
                          availableExchanges.find(o => o.value === exchange)
                            .text
                        }
                      </span>
                    ))
                  : 'None'}
              </Tile>
            </div>
            <div className="setup__info">
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
