import * as protocol from '@melonproject/protocol';

const getEnvironment = (track, endpoint) => {
  return protocol.utils.environment.constructEnvironment({
    endpoint: endpoint.replace('http', 'ws'),
    track,
  });
};

export default getEnvironment;
