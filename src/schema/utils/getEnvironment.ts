import { constructEnvironment } from '@melonproject/protocol';

const getEnvironment = (track, endpoint) => {
  return constructEnvironment({
    endpoint: endpoint.replace('http', 'ws'),
    track,
  });
};

export default getEnvironment;
