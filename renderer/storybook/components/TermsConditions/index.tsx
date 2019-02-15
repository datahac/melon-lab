import React, { Fragment, StatelessComponent } from 'react';

export interface TermsConditionsProps {
  networkId?: string;
}

export const TermsConditions: StatelessComponent<TermsConditionsProps> = ({
  networkId,
}) => (
  <div className="conditions">
    <Fragment>
      <h4>Disclaimer for the use of the Melon Protocol (“Disclaimer”)</h4>
      <p>
        <strong>THIS SOFTWARE IS INTENDED FOR TESTING PURPOSES ONLY.</strong>
      </p>
      <p>
        <strong>
          Melon is an open source, decentralized crypto asset management
          protocol for setting up and running on-chain crypto funds. Before
          using the Melon protocol, please review the documentation for a
          thorough explanation of its mechanics.
        </strong>
      </p>
      <p>
        <strong>
          DEPLOYMENT OF MELON PROTOCOL IN A MAINNET ENVIRONMENT ONLY FOR TESTING
          PURPOSES
        </strong>
        : Melonport AG (the “Company”) has developed a Smart-Contract-System
        (the “Melon Protocol”) which enables users, to manage crypto assets. THE
        SOFTWARE DEPLOYMENT OF THE CURRENT VERSION OF THE MELON PROTOCOL TO THE
        ETHEREUM MAINNET IS MADE FOR TESTING PURPOSES IN A LIVE ENVIRONMENT
        ONLY. .
      </p>

      <p>
        <strong>NO WARRANTY</strong>: THE USER THEREFORE UNDERSTANDS AND
        ACKNOWLEDGES THAT AS THE MELON PROTOCOL IS OF EXPERIMENTAL NATURE AND
        DEPLOYED FOR TESTING MODE ONLY, ANY ETH OR OTHER CRYPTO ASSETS USED TO
        INTERACT WITH THE MELON PROTOCOL ARE AT RISK OF BEING LOST INDEFINITELY.
        User understands and accepts that the Melon Protocol is provided “as is”
        and any expressed or implied warranties of merchantability and fitness
        for a particular purpose are disclaimed. In particular, User
        acknowledges that the Melon Protocol, even though developed in
        accordance to the state of the art, is likely to contain bugs, defects,
        or errors (including any bug, defect, or error relating to or resulting
        from the display, manipulation, processing, storage, transmission, or
        use of data) that materially and adversely affects the use,
        functionality, or performance of the Melon Protocol, or any product or
        system containing or used in conjunction with the Melon Protocol.
      </p>
      <p>
        <strong>NO LIABILITY OF THE COMPANY</strong>: In no event shall the
        Company be liable of any direct, indirect, incidental, special,
        exemplary, or consequential damages (including, but not limited to,
        procurement of substitute goods or services; loss of use, data, or
        profits; or business interruption).
      </p>
      <p>
        <strong>
          NO INVOLVEMENT OF COMPANY IN ANY TRANSACTIONS BETWEEN USERS
        </strong>
        : WHILE THE COMPANY DEVELOPED THE MELON PROTOCOL, IT IS IMPORTANT TO
        NOTE THAT THE COMPANY IS NOT INVOLVED IN ANY OF THE INTERACTIONS BY
        MANAGERS WITH THE MELON PROTOCOL, NOR DOES IT HOLD CUSTODY OF ANY OF THE
        USER ASSETS INVOLVED DURING THE COMPETITION.
      </p>
      <p>
        <strong>
          RESPONSIBILTY FOR SECURITY OF PASSWORDS REMAINS SOLELY WITH USER
        </strong>
        : There is no possibility for the Company to recover USER’S private
        password, respectively USER’S private key. When setting up an account
        within the Melon platform, user will be responsible for keeping user’s
        own account secrets, which may be a twelve-word seed phrase, an account
        file, or other locally stored secret information. The Melon Protocol
        encrypts this information locally with a password user provides, that is
        never sent to the Company servers, nor known otherwise to the Company.
        The Company cannot and will not be liable for any loss or damage arising
        from users failure to comply with this section.
      </p>
      <p>
        <strong>INTERACTIONS WITH PROTOCOL CANNOT BE REVISED </strong>: User
        understands there are no rights of recourse or compensation whatsoever
        especially with regards to any complaints of theft, malfunctioning of
        the Melon Protocol, external abuse of the Melon Protocol, misbehavior of
        managers etc.
      </p>

      <p>
        <strong>
          RESPONSIBILITY FOR LEGAL COMPLIANCE AND TAXATION SOLELY WITH USER
        </strong>
        : User understands and accepts that user is solely responsible for
        compliance with all laws that may apply to user’s particular use of the
        Melon Protocol. Company makes no representation regarding the
        application of any laws. User is aware of the fact, that the use of the
        Melon Protocol may be qualified differently in different jurisdictions
        and agrees that Company is not responsible for determining whether or
        which laws may apply to his/her use of the Melon Protocol. Further, user
        understands and accepts that it is user’s sole responsibility to assess
        whether any taxes will become due for his/her interactions with the
        Melon Protocol under any applicable jurisdiction.
      </p>
      <p>
        <strong>JURISDICTION AND GOVERNING LAW</strong>: Any disputes arising
        out of this Disclaimer and the use of the Melon Protocol shall be
        submitted to the exclusive jurisdiction of the courts of Zug,
        Switzerland and this Disclaimer, as well as the use of the Melon
        Protocol shall be exclusively governed by Swiss law, except for the
        United Nations Convention for the International Sales of Goods which is
        excluded.
      </p>
      <p>
        BY ACCEPTING THIS DOCUMENT THE USER UNDERSTANDS AND ACCEPTS ALL THE
        TERMS AND CONDITIONS AS SET HEREIN.
      </p>
    </Fragment>
  </div>
);

export default TermsConditions;
