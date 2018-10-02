import FactSheet from '~/components/Factsheet';
import { withProps } from 'recompose';
import { networks } from '@melonproject/melon.js';

const withFactSheetProps = withProps(props => ({
  reportUrl: `https://${
    props.network === networks.KOVAN ? 'melon' : 'olympiad'
  }-reporting.now.sh/report/${props.address}`,
}));

export default withFactSheetProps(FactSheet);
