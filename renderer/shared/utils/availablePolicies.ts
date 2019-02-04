import Input from '~/blocks/Input';
import Textarea from '~/blocks/Textarea';
import MultiDropdown from '~/blocks/MultiDropdown';
import * as Tm from '@melonproject/token-math';

interface AvailablePolicies {
  [key]: {
    name: string;
    desc?: string;
    unit?: string;
    Component: any;
    ComponentProps?: any;
  };
}

const availablePolicies = (
  tokens?: Tm.QuantityInterface[],
): AvailablePolicies => ({
  priceTolerance: {
    name: 'Price tolerance',
    desc: 'The higher the tolerance, the greater the risk',
    unit: '%',
    defaultValue: '',
    Component: Input,
    ComponentProps: {
      placeholder: 0,
    },
  },
  maxPositions: {
    name: 'Maximum number of positions',
    desc: 'The higher the tolerance, the greater the risk',
    defaultValue: '',
    Component: Input,
    ComponentProps: {
      placeholder: 0,
    },
  },
  maxConcentration: {
    name: 'Max concentration',
    desc: 'High Diversification <-> High Concentration',
    unit: '%',
    defaultValue: '',
    Component: Input,
    ComponentProps: {
      placeholder: 0,
    },
  },
  userWhitelist: {
    name: 'User whitelist',
    desc: 'Whitelisted ethereum addresses (one per line)',
    defaultValue: '',
    Component: Textarea,
    ComponentProps: {
      placeholder: '0x0000...\n0x0000...',
    },
  },
  assetWhitelist: {
    name: 'Asset whitelist',
    desc: 'Whitelisted assets (one per line)',
    defaultValue: [],
    Component: MultiDropdown,
    ComponentProps: {
      placeholder: 'MLN\nETH',
      options: tokens,
    },
  },
  assetBlacklist: {
    name: 'Asset blacklist',
    desc: 'Whitelisted assets (one per line)',
    defaultValue: [],
    Component: MultiDropdown,
    ComponentProps: {
      placeholder: 'XRP\nEOS',
      options: tokens,
    },
  },
});

export default availablePolicies;
