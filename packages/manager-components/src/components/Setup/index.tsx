import React, { StatelessComponent } from 'react';
import Button from '~/blocks/Button';
import Checkbox from '~/blocks/Checkbox';
import Form from '~/blocks/Form';
import Input from '~/blocks/Input';
import Modal from '~/blocks/Modal';
import TermsAndConditions from '~/components/TermsAndConditions';

import styles from './styles.css';

interface FormValues {
  name: string;
  signed: boolean;
}

export interface SetupProps {
  competitionName?: string;
  config: {
    canonicalPriceFeedAddress: string;
    noComplianceAddress: string;
    competitionComplianceAddress: string;
  };
  errors?: any;
  handleBlur?: () => void;
  handleChange?: () => void;
  handleSubmit?: () => void;
  isCompetition?: boolean;
  loading?: boolean;
  networkId?: string;
  touched?: any;
  values: FormValues;
  onClickAccept: () => void;
  onClickDecline: () => void;
  signed?: boolean;
}

export const Setup: StatelessComponent<SetupProps> = ({
  competitionName = 'Naxos',
  config,
  errors,
  handleBlur,
  handleChange,
  handleSubmit,
  isCompetition,
  loading,
  networkId,
  touched,
  values,
  signed,
  onClickAccept,
  onClickDecline,
}) => (
  <div className="setup">
    <style jsx>{styles}</style>
    <h3>Setup your fund</h3>
    {loading && <p>Deploying your fund to the Ethereum blockchain</p>}

    <Modal
      title="Terms and Conditions"
      isOpen={!signed}
      PrimaryAction={Button}
      PrimaryActionProps={{
        children: 'Decline',
        style: 'secondary',
        onClick: onClickDecline,
      }}
      SecondaryAction={Button}
      SecondaryActionProps={{
        children: 'Accept',
        onClick: onClickAccept,
      }}
    >
      <TermsAndConditions />
    </Modal>

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
        For this version, the modules that your fund will use are predefined ie.
        you do not need to choose a module. For your record, below are the
        predefined modules for this version.
      </p>
      <div className="setup__exchanges">
        <h4>Exchange:</h4>
        <div className="setup__exchanges-checkbox">
          <Checkbox
            name="exchanges"
            value="OasisDex"
            text="OasisDex"
            disabled
            defaultChecked
          />
        </div>
        <div className="setup__exchanges-checkbox">
          <Checkbox
            name="exchanges"
            value="0x relayers"
            text="0x relayers"
            disabled
            defaultChecked
          />
        </div>
      </div>
      <div className="setup__info">
        Pricefeed:{' '}
        <a
          href={`https://${
            networkId === '42' ? 'kovan.' : ''
          }etherscan.io/address/${config.canonicalPriceFeedAddress}`}
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
                networkId === '42' ? 'kovan.' : ''
              }etherscan.io/address/${config.competitionComplianceAddress}`}
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
              }etherscan.io/address/${config.noComplianceAddress}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>No compliance - anyone can invest (in WETH)</strong>
            </a>
          </div>
        )}
        Risk Management: <strong>Disabled (all trades allowed)</strong>
      </div>
      <Button type="submit">Create and deploy my fund!</Button>
    </Form>
  </div>
);

export default Setup;
