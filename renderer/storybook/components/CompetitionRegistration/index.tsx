import React, { Fragment, StatelessComponent } from 'react';
import Button from '~/blocks/Button';

export interface CompetitionRegistrationProps {
  competitionSignature?: boolean;
  continueToSignCompetitionTerms: () => void;
  fundAddress?: string;
  isRegistered: () => void;
  managerAddress?: string;
  r?: string;
  s?: string;
  showedRegistration?: boolean;
  sign: () => void;
  skipRegistration: () => void;
  v?: string;
}

export const CompetitionRegistration: StatelessComponent<
  CompetitionRegistrationProps
> = ({
  competitionSignature,
  continueToSignCompetitionTerms,
  fundAddress,
  isRegistered,
  managerAddress,
  r,
  s,
  showedRegistration,
  sign,
  skipRegistration,
  v,
}) => {
  const onClickPursue = () => {
    window.open(
      `https://ipfs.io/ipns/competition.melon.fund/#${fundAddress}/${managerAddress}/${r}/${s}/${v}`,
      '_blank',
      'noopener',
      'noreferrer',
    );
  };

  return (
    <div className="competition-registration">
      {!showedRegistration ? (
        <Fragment>
          <h3>Competition registration</h3>
          <div>
            <p>
              If you want to take part into the Melon Managers Competition, you
              need to register on our competition registration website.
            </p>
            <p>
              If you do not register, you will not be entitled to any reward,
              even if your fund is in the top 100 of the ranking.
            </p>
            <h4>
              It is highly recommended that you register in the competition;
              otherwise, if you are in the top 100 and unregistered, it is
              possible that someone registers your fund to the competition with
              a payout address not controled by you.
            </h4>

            <p>
              If you wish to register, click the "Register" button below. After
              completing the registration, come back here and click the
              "Continue" button.
            </p>
            <p>
              If do not wish to register now -or are already registered, click
              the "Continue" button.
            </p>
            <br />
            <Button onClick={continueToSignCompetitionTerms}>
              REGISTER (Recommended)
            </Button>
            <p>
              <Button style="secondary" onClick={skipRegistration}>
                Continue
              </Button>
            </p>
          </div>
        </Fragment>
      ) : competitionSignature ? (
        <div>
          <p>
            You have digitally signed the terms and conditions of the Melon
            Manager competition.
          </p>
          <p>
            Click on the "Pursue registration" button to finalize your
            registration on our Registration website. You will need to have
            metamask set on the main net to pursue.
          </p>
          <p>
            Once your registration is completed on the Registration website,
            come back to this page and click on "Registration Done"
          </p>
          <p>
            <Button style="secondary" onClick={onClickPursue}>
              Pursue registration
            </Button>
          </p>
          <p>
            <Button style="secondary" onClick={isRegistered}>
              Registration done
            </Button>
          </p>
        </div>
      ) : (
        <div>
          <h4>TERMS AND CONDITIONS</h4>
          <p>
            The following terms and conditions have been deployed to IPFS and
            resolve to the following hash:{' '}
            <a
              href="https://ipfs.io/ipfs/QmQ7DqjpxmTDbaxcH5qwv8QmGvJY7rhb8UV2QRfCEFBp8V"
              target="_blank"
              rel="noopener noreferrer"
            >
              QmQ7DqjpxmTDbaxcH5qwv8QmGvJY7rhb8UV2QRfCEFBp8V
            </a>
          </p>
          <p>
            <strong>
              THIS SOFTWARE IS INTENDED FOR TESTING PURPOSES ONLY.
            </strong>
          </p>
          <p>
            It is intended to be used on the Kovan testnet and is by no means
            intended to be used on the main net. Never send assets or tokens of
            real value to a smart contract on the test net; they could be
            impossible to recover.
          </p>
          <p>
            <strong>
              DO NOT SEND REAL ETHER OR VALUE TOKEN TO A SMART CONTRACT ON THE
              TESTNET.
            </strong>
          </p>
          <p>
            User acknowledges that even though this competition registration is
            on the mainnet, that this competition is taking place on the Kovan
            testnet.
          </p>
          <p>
            The User understands and accepts that this software is provided “as
            is” and any expressed or implied warranties of merchantability and
            fitness for a particular purpose are disclaimed. In no event shall
            Melonport AG or its Contributors be liable of any direct, indirect,
            incidental, special, exemplary, or consequential damages (including,
            but not limited to, procurement of substitute goods or services;
            loss of use, data, or profits; or business interruption).
          </p>
          <p>
            Neither Melonport AG nor its Contributors are liable for any
            damages, however caused and through any theory of liability, whether
            in contract, strict liability, or tort (including negligence or
            otherwise) arising in any way out of the use of this software, even
            if advised of the possibility of such damage.
          </p>
          <p>
            <strong>
              THE USER UNDERSTANDS AND ACCEPTS THAT THE WINNERS AND PRIZES WILL
              BE DETERMINED AT FULL DISCRETION BY MELONPORT AG AND MELONPORT AG
              ALONE.
            </strong>
          </p>
          <p>
            Complaints concerning the failure to conduct a trading operation in
            a contest account because of low internet connection quality (either
            on the side of the participant or on the side of IPFS or of
            Melonport’s hosting provider) are not accepted.
          </p>
          <p>
            Complaints concerning disappeared or incorrect transactions due to
            failure of the system or similar are not accepted.
          </p>
          <p>
            Complaints around any potential server downtime will not be
            accepted.
          </p>
          <p>
            Complaints around faucet temporarily running out of funds or any
            other technical inconsistencies for that matter will not be
            accepted.
          </p>
          <p>
            Complaints concerning price feed inaccuracy or downtime will not be
            accepted.
          </p>
          <p>
            Melonport retains the right to close or cancel the competition at
            any time because of unexpected or unusual circumstances.
          </p>
          <p>
            If for any reason the competition is terminated due to unforeseen
            circumstances before the official end date, the ranking of
            participants at the moment of termination of the competition will
            not be considered as the basis for establishing winners.
          </p>
          <p>
            If for any reason the competition is terminated due to unforeseen
            circumstances before the official end date, Melonport reserves the
            right to cancel the paying out of prize money.
          </p>
          <p>
            Melonport retains the right to change the competition rules if
            unforeseen circumstances should arise or if an obvious error has
            been found.
          </p>
          <p>
            Melonport is entitled to exclude or disqualify any participants from
            the competition. For example under the following circumstances.
            Participant breaches terms and conditions of Melonport set forth
            herein. Participant violates the principle of good faith. Payout to
            participant not possible due to regulatory or other reasons.
          </p>
          <p>
            <strong>
              PRIZES MAY BE CONDITIONAL ON COMPLETING AND PASSING A KYC/AML
              CHECK WITHIN 30 DAYS
            </strong>
          </p>
          <p>
            The extent of the KYC/AML check will depend on the size of the prize
            and may vary accordingly. In such a case in order to claim your
            prize, you must email team@melonport.com with the subject “CLAIM
            PRIZE”. The email must include a copy of your passport and an
            indication of whether you represent a company or individual. Further
            information may be requested depending on the size of the prize.
          </p>
          <p>
            Claiming prizes must occur within 30 days of the official end time
            of the competition. After this period, prizes will become void and
            Melonport will hold no responsibility or incur any liabilities for
            claims made after this time..
          </p>
          <p>
            Prizes will be paid out to the Ethereum mainnet address as specified
            in the competition registration process, once the KYC/AML check has
            been satisfied. Losing access to this Ethereum mainnet address in
            some form or another will lead to lost prize money.
          </p>
          <p>
            It is in the responsibility of any participant to make sure that
            their participation in the competition is in accordance with the
            respective laws of their country and/or region.
          </p>
          <p>
            It is the responsibility of any winner of any crypto Melon token(s)
            to declare the token received token correctly in his/her private
            and/or business tax declaration (based on actual situation,
            jurisdiction, etc).
          </p>
          <p>
            <strong>GOVERNING LAW AND JURISDICTION</strong>
          </p>
          <p>
            This Agreement, shall be governed by, interpreted and construed in
            accordance with the substantive laws of Switzerland. The competent
            courts of Zug, Switzerland, shall have exclusive jurisdiction for
            all disputes arising out of or in connection with this Agreement,
            subject to appeal, if any.
          </p>
          <p>
            <strong>
              BY SIGNING THE HASH OF THIS DOCUMENT THE USER UNDERSTANDS AND
              ACCEPTS ALL THE TERMS AND CONDITIONS AS SET HEREIN.
            </strong>
          </p>
          <Button style="secondary" onClick={sign}>
            I understand and agree to sign the above terms and conditions.
          </Button>
        </div>
      )}
    </div>
  );
};

export default CompetitionRegistration;
