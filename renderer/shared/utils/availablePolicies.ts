import Input from '~/blocks/Input';
import Textarea from '~/blocks/Textarea';

const availablePolicies = {
  priceTolerance: {
    name: 'Price tolerance',
    desc: 'The higher the tolerance, the greater the risk',
    Component: Input,
    unit: '%',
    limitations: {
      placeholder: 0,
    },
  },
  maxPositions: {
    name: 'Max position',
    desc: 'The higher the tolerance, the greater the risk',
    Component: Input,
    unit: '%',
    limitations: {
      placeholder: 0,
    },
  },
  maxConcentration: {
    name: 'Max concentration',
    desc: 'High Diversification <-> High Concentration',
    Component: Input,
    unit: '%',
    limitations: {
      placeholder: 0,
    },
  },
  userWhitelist: {
    name: 'User whitelist',
    desc: 'Whitelisted ethereum addresses (one per line)',
    Component: Textarea,
    limitations: {
      placeholder: '0x0000...\n0x0000...',
    },
  },
  assetWhitelist: {
    name: 'Asset whitelist',
    desc: 'Whitelisted assets (one per line)',
    Component: Textarea,
    limitations: {
      placeholder: 'MLN\nETH',
    },
  },
  assetBlacklist: {
    name: 'Asset blacklist',
    desc: 'Whitelisted assets (one per line)',
    Component: Textarea,
    limitations: {
      placeholder: 'XRP\nEOS',
    },
  },
};

export default availablePolicies;
