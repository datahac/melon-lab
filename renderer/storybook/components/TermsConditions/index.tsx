import React, { Fragment, StatelessComponent } from 'react';

export interface TermsConditionsProps {
  networkId?: string;
}

export const TermsConditions: StatelessComponent<TermsConditionsProps> = ({
  networkId,
}) => (
  <div className="conditions">
    <Fragment>
      <h4>Disclaimer for the use of the Melon Protocol</h4>
      <p>
        <b>IMPORTANT NOTE:</b> Please read the full version of this{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/melonproject/software-disclaimer/blob/master/MelonProtocolDisclaimer.md"
        >
          disclaimer
        </a>{' '}
        carefully before using the MELON Protocol. YOUR USE OF THE MELON
        PROTOCOL AND/OR THE SOFTWARE MAY BE SUBJECT TO THE FINANCIAL LAWS AND
        REGULATIONS OF VARIOUS JURISDICTIONS. PRIOR TO USING THE MELON PROTOCOL,
        SEEK LEGAL ASSISTANCE TO ASSURE THAT YOU MAY USE THE SOFTWARE IN
        COMPLIANCE WITH APPLICABLE LAW.{' '}
        <b>
          FAILURE TO DO SO MAY SUBJECT YOU TO CRIMINAL AS WELL AS CIVIL
          PENALTIES IN ONE OR MORE JURISDICTIONS.
        </b>{' '}
        BY USING THIS SOFTWARE, YOU CONFIRM THAT YOU HAVE SOUGHT THE ADVICE OF
        COMPETENT COUNSEL OR ARE OTHERWISE FAMILIAR WITH THE APPLICABLE LAWS AND
        REGULATIONS PERTAINING TO YOUR INTENDED USE OF THE MELON PROTOCOL. BY
        USING THIS SOFTWARE, YOU UNDERSTAND, ACKNOWLEDGE AND ACCEPT THAT THE
        MELON PROTOCOL AND/OR THE UNDERLYING SOFTWARE ARE PROVIDED “AS IS” AND
        WITHOUT WARRANTIES OR REPRESENTATIONS OF ANY KIND EITHER EXPRESSED OR
        IMPLIED. ANY USE OF THIS OPEN SOURCE SOFTWARE RELEASED UNDER THE GNU
        GENERAL PUBLIC LICENSE VERSION 3 (GPL 3) IS DONE AT YOUR OWN RISK TO THE
        FULLEST EXTENT PERMISSIBLE PURSUANT TO APPLICABLE LAW ANY AND ALL
        LIABILITY AS WELL AS ALL WARRANTIES, INCLUDING ANY FITNESS FOR A
        PARTICULAR PURPOSE WITH RESPECT TO THE MELON PROTOCOL AND/OR THE
        UNDERLYING SOFTWARE AND THE USE THEREOF ARE DISCLAIMED.
      </p>
    </Fragment>
  </div>
);

export default TermsConditions;
