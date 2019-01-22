import Input from '~/blocks/Input';

const availablePolicies = {
  priceTolerance: {
    name: 'Price tolerance',
    desc: 'The higher the tolerance, the greater the risk',
    Component: Input,
    unit: '%',
  },
  maxPositions: {
    name: 'Max position',
    desc: 'The higher the tolerance, the greater the risk',
    Component: Input,
    unit: '%',
  },
  maxConcentration: {
    name: 'Max concentration',
    desc: 'High Diversification <-> High Concentration',
    Component: Input,
    unit: '%',
  },
};

export default availablePolicies;
