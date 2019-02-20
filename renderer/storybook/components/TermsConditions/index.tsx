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
        IMPORTANT NOTE: Please read the full version of this disclaimer
        carefully before using the Melon Manager interface and the Melon
        protocol. By using this software, you confirm to be aware that according
        to laws and regulations of various jurisdictions, certain use types of
        the MELON Protocol and/or the Software are subject to financial market
        and/or other regulations and/or licensing requirements. Prior to using
        the MELON Protocol, seek legal assistance to assure that you may use the
        software in compliance with applicable regulations. BY USING THIS
        SOFTWARE, YOU UNDERSTAND, ACKNOWLEDGE AND ACCEPT THAT THE MELON PROTOCOL
        AND/OR THE UNDERLYING SOFTWARE ARE PROVIDED “AS IS” AND WITHOUT
        WARRANTIES OR REPRESENTATIONS OF ANY KIND EITHER EXPRESSED OR IMPLIED.
        ANY USE OF THIS OPEN SOURCE SOFTWARE RELEASED UNDER THE GNU GENERAL
        PUBLIC LICENSE VERSION 3 (GPL 3) IS DONE AT YOUR OWN RISK TO THE FULLEST
        EXTENT PERMISSIBLE PURSUANT TO APPLICABLE LAW ANY AND ALL LIABILITY AS
        WELL AS ALL WARRANTIES, INCLUDING ANY FITNESS FOR A PARTICULAR PURPOSE
        WITH RESPECT TO THE MELON PROTOCOL AND/OR THE UNDERLYING SOFTWARE AND
        THE USE THEREOF ARE DISCLAIMED.
      </p>
    </Fragment>
  </div>
);

export default TermsConditions;
