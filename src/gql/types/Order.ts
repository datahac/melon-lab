export default {
  __resolveType: object => {
    switch (object.exchange) {
      case 'RADAR_RELAY':
      case 'ERC_DEX':
        return 'ZeroExOrder';
      case 'OASIS_DEX':
      case 'KYBER_NETWORK':
        return 'OasisDexOrder';
      default:
        return null;
    }
  },
};
