function getNetwork(environment) {
  const track = environment && environment.track;

  switch (track) {
    case 'live':
      return 'LIVE';
    case 'kovan-competition':
    case 'kovan-demo':
      return 'KOVAN';
    default:
      return null;
  }
}

export default getNetwork;
