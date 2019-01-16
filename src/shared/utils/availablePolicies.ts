import Input from '~/blocks/Input';

const availablePolicies = {
  priceTolerance: {
    name: 'Price tolerance',
    desc: 'The higher the tolerance, the greater the risk',
    Component: Input,
    unit: '%',
  },
};

export default availablePolicies;
