import Input from '~/blocks/Input';
import Textarea from '~/blocks/Textarea';
import MultiDropdown from '~/blocks/MultiDropdown';

const availablePolicies = tokens => ({
  priceTolerance: {
    name: 'Price tolerance',
    desc: 'The higher the tolerance, the greater the risk',
    unit: '%',
    Component: Input,
    ComponentProps: {
      placeholder: 0,
    },
  },
  maxPositions: {
    name: 'Max position',
    desc: 'The higher the tolerance, the greater the risk',
    unit: '%',
    Component: Input,
    ComponentProps: {
      placeholder: 0,
    },
  },
  maxConcentration: {
    name: 'Max concentration',
    desc: 'High Diversification <-> High Concentration',
    unit: '%',
    Component: Input,
    ComponentProps: {
      placeholder: 0,
    },
  },
  userWhitelist: {
    name: 'User whitelist',
    desc: 'Whitelisted ethereum addresses (one per line)',
    Component: Textarea,
    ComponentProps: {
      placeholder: '0x0000...\n0x0000...',
    },
  },
  assetWhitelist: {
    name: 'Asset whitelist',
    desc: 'Whitelisted assets (one per line)',
    Component: MultiDropdown,
    ComponentProps: {
      placeholder: 'MLN\nETH',
      options: tokens,
    },
  },
  assetBlacklist: {
    name: 'Asset blacklist',
    desc: 'Whitelisted assets (one per line)',
    Component: MultiDropdown,
    ComponentProps: {
      placeholder: 'XRP\nEOS',
      options: tokens,
    },
  },
});

export default availablePolicies;
