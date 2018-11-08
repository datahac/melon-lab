import React, { StatelessComponent } from 'react';
import Button from '~/blocks/Button';

import styles from './styles.css';

export interface OlympiadPlaceholderProps {
  goToGenerateAccount?: () => void;
  goToAccount?: () => void;
  address?: string;
}

export const OlympiadPlaceholder: StatelessComponent<
  OlympiadPlaceholderProps
> = ({ goToGenerateAccount, goToAccount, address }) => (
  <div className="olympiad-placeholder">
    <style jsx>{styles}</style>
    <h1>Welcome to the Melon Olympiad</h1>
    {/* <h5>
        <a
          href="https://medium.com/@zenkjenna/introducing-melon-olympiad-861687d0703b"
          target="_blank"
        >
          [Click here to read blog post introducing the Melon Olympiad]
        </a>
      </h5> */}
    <p>
      <i>([méllō], μέλλω; Greek for “destined to be”)</i> is blockchain software
      that seeks to enable participants to set up, manage and invest in
      technology regulated investment funds in a way that reduces barriers to
      entry, while minimizing the requirements for trust.{' '}
    </p>
    <p>
      An Olympiad <i>([əˈlɪmpɪad], Ὀλυμπιάς)</i> is a period of four years
      associated with the Olympic Games of the Ancient Greeks. During the
      Hellenistic period, beginning with Ephorus, it was used as a calendar
      epoch.
    </p>
    <p>
      <strong>
        The Melon Olympiad is a series of blockchain-based asset management
        competitions composed of several rounds. Each of the rounds will set a
        clear goal for participants, and will issue a defined number of Melon
        tokens.
      </strong>
    </p>
    <p>
      Following a successful token sale in 2017, Melonport AG is left with
      500,600 Melon (MLN) tokens to distribute. Rather than distribute these in
      a traditional manner, Melonport has created a series of sub-contribution
      periods called Melon Olympiad. This will ensure that tokens are allocated
      to active community members who engage and use the Melon asset management
      ecosystem.
    </p>
    <p>
      The distribution of up to half a million Melon tokens will largely occur
      via a public contribution period is in keeping with Melonport’s commitment
      to creating a diverse and decentralized ecosystem in which there are as
      many participants as possible. By awarding tokens to testers who have put
      their time and energy into scrutinizing the Melon software, it will also
      ensure adoption and help to further improve the codebase.
    </p>
    <p>
      The contribution period will be split into rounds referred to as Melon
      Olympiad capsules, with a portion of tokens allocated for each stage. Upon
      completion of the Melon Olympiad, all 500,600 tokens will have been
      issued. In keeping with the mythology and provenance of the Olympic Games,
      each round will be named after a Greek island, commencing with Paros.
      Participants will be obliged to create a fund and send Ether to the
      relevant Olympiad smart-contract, which will then be matched with an
      equivalent amount of MLN tokens plus an additional incentive amount. It is
      then up to the participant to manage the fund for a period of 2 weeks with
      a view to maximizing capital appreciation.
    </p>
    <p>
      The Melon Protocol intends to present a decentralized, public,
      permissionless, robust infrastructure for the secure management of digital
      assets on the Ethereum blockchain. It aims to be a viable, low-cost
      alternative to the current fund management ecosystem which has evolved
      similarly across most legal jurisdictions. The protocol itself is a
      collection of smart-contracts written in the Solidity programming
      language. Supporting functionality that allows browsers to freely interact
      with the protocol is provided by the javascript library Melon.js. For more
      information visit: https://docs.melonport.com and our github
      https://github.com/melonproject/.
    </p>
    <p>
      Participants interested in taking part in the Melon Olympiad Paros can
      register by following the instructions provided below.
    </p>
    <h2>Melon Olympiad, first round: Paros</h2>
    <p>
      For the Paros round, the participant compensation is as follows: for each
      ether contributed, the participant will receive 20 MLN (subject to change
      prior to the start of the Paros Olympiad in the event of price
      volatility).
    </p>
    <h2>Instructions on how to participate</h2>
    <p>
      Paros is open to all participants who have undergone the KYC process with
      Bitcoin Suisse and whitelisted their Ethereum addresses generated on
      olympiad.melon.fund.
    </p>
    <p>
      In order to ensure the highest level of security and performance, we
      strongly recommend you to download the Electron app and to run your own
      parity node. You can find the instructions{' '}
      <a
        href={`https://www.youtube.com/watch?v=Wp5DAFWfc8U&t=25s`}
        target="_blank"
      >
        here
      </a>
      .
    </p>
    <p>
      Before we start, make sure you have either one of the two options ready.
    </p>
    <p>1. Your mnemonic phrase (12 words seed phrase) or</p>
    <p>2. Your JSON file + password</p>
    <p>
      In order to contribute ETH to Paros you need to first fund your wallet
      with the desired amount you want to contribute. In addition, you need to
      have a bit more ETH in your wallet to cover the gas costs for setting up
      your fund, register in the competition and (if applicable) to trade.
    </p>
    <h4>Step 1</h4>
    <p>Press "Setup Fund"</p>
    <h4>Step 2 </h4>
    <p>
      Import your wallet either by importing your mnemonic phrase or by
      uploading your JSON file and decrypting it with your password. You can see
      your public address on the top right of the page, together with your ETH
      balance. Your wallet needs to be the whitelisted wallet on Bitcoin Suisse,
      otherwise you won’t be able to create a fund. In terms of the Melon
      protocol, this wallet will act as the owner wallet of your fund (manager
      address), which you will create in a minute.
    </p>
    <h4>Step 3 </h4>
    <p>
      Read and agree to the{' '}
      <a
        href={
          `https://github.com/melonproject/contribution/blob/master/` +
          `Melonport_Second%20Contribution%20Period_FINAL.pdf`
        }
        target="_blank"
      >
        terms and conditions
      </a>
      .
    </p>
    <h4>Step 4  </h4> <p>Choose a name for your fund and press “Setup fund”.</p>
    <h4>Step 5 </h4>{' '}
    <p>
      You are now at the <strong>contribution page</strong>. Put in the amount
      you want to contribute to the Paros smart contract. Below, you will see
      the estimated amount of MLN tokens that will be invested into your fund by
      the Paros smart contract (the conversion rate is fixed at 20 MLN tokens
      for 1 ETH). Make sure that you have enough ETH to cover the gas costs.
      Once you are ready, please press the “Contribute” button to send ETH to
      the Paros smart contract.{' '}
      <strong>
        The contract, in turn, will invest the equivalent amount in MLN to your
        fund.
      </strong>
    </p>
    <h4>Step 6  </h4>{' '}
    <p>
      Come back to this website olympiad.melon.fund. Once Paros is live, you
      will be guided to create your fund.
    </p>
    <h4>Step 7  </h4>{' '}
    <p>
      Your fund is now deployed to the Ethereum main net and funded with MLN
      tokens. You can see the public address of your fund in the URL.
    </p>
    <p>
      From this point onwards, you are free to do what you want. You can see the
      basic information about your fund in the middle. Your fund is denominated
      in WETH. There are two options:
    </p>
    <p>
      1. <strong>Keep the MLN tokens</strong>. In this case, you do not need to
      do anything until Paros ends (you can see the official end date/time in
      the top right corner). Once Paros has ended, you will have the option to
      claim your reward and redeem your shares, which will transfer all MLN
      tokens of the fund to your wallet address.
    </p>
    <p>
      <strong>OR</strong>
    </p>
    <p>
      2. <strong>Trade</strong>. If you would like to test your fund management
      skills, you can do so by trading on the decentralized exchanges we have
      integrated (OasisDex, Radar Relay, ERCDex). As most assets are quoted
      against ETH, the first trade you need to place is to sell some of your MLN
      tokens against WETH.
    </p>
    <p>
      The terms and conditions must be read by all participants.
      <a
        href="https://ipfs.io/ipfs/QmbTsKQgACY9DzaW3SVSnLuCTo6f4H24SiXXfAyAGrTYTz"
        target="_blank"
      >
        Click here to read the terms and conditions for the second contribution
        period
      </a>
      .
      <a
        href="https://ipfs.io/ipfs/Qme4yLq3vFD2hiSyyJR3oukQYWMR9vBsducrNipWXLFnug"
        target="_blank"
      >
        Click here to read the terms and conditions for the Paros Olympiad
        (first capsule).
      </a>
      Please make sure you read carefully both documents. When you will create a
      fund, you will be prompted to cryptographically sign those terms and
      conditions to show your understanding and agreement.
    </p>
    {/* <h2>Generate your wallet</h2>
      {!address ? (
        <div>
          <p>
            The wallet you generate here will be the wallet you will use to
            create a fund when the competition starts (referred to as manager
            address). It will be the wallet you will use to contribute ether to
            the Olympiad contract. It is also the wallet to which your
            compensation will be transferred to at the end of the period.
          </p>
          <p>
            The first step to perform if you wish to participate is to generate
            your wallet. Please click on the "Generate my wallet" button below:
          </p>
          <p>
            <Button
              basic
              color="black"
              style={{ width: '100%' }}
              onClick={goToGenerateAccount}
            >
              Generate my wallet!
            </Button>
            <br />
            <br />
            or
            <br />
            <br />
            <Button
              basic
              color="grey"
              style={{ width: '100%', padding: 5 }}
              onClick={goToAccount}
            >
              Import existing wallet
            </Button>
          </p>
        </div>
      ) : (
        <div>
          <p>
            You have already created a wallet with the address:{' '}
            <strong>{address}</strong>. Use this for white listing on{' '}
            <a href="https://ico.bitcoinsuisse.ch/" target="_blank">
              ico.bitcoinsuisse.ch
            </a>
            <Button
              basic
              color="grey"
              style={{ width: '100%', padding: 5 }}
              onClick={goToAccount}
            >
              Manage your wallet
            </Button>
          </p>
        </div>
      )} */}
  </div>
);

export default OlympiadPlaceholder;
