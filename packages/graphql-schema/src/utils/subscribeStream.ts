import withUnsubscribe from './withUnsubscribe';

const subscribeStream = (pubsub, channel, stream$) => {
  const iterator = pubsub.asyncIterator(channel);
  const publish = value => pubsub.publish(channel, value);
  return withUnsubscribe(stream$, iterator, publish);
};

export default subscribeStream;
