import Header from '~/components/Header';
import { withProps } from 'recompose';
import { networks } from '@melonproject/melon.js';

const displayNetwork = network => {
  const key = Object.values(networks).indexOf(network);
  const values = Object.keys(networks);
  return values[key] && values[key].toLocaleLowerCase();
};

const withFactSheetProps = withProps(props => ({
  network: props.network && displayNetwork(props.network),
}));

export default withFactSheetProps(Header);
