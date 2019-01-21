import { storiesOf } from '@storybook/react';
import React from 'react';
import Notification from './index';

const text = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
voluptua. At vero eos et accusam et justo duo dolores et ea rebum.`;

storiesOf('Blocks|Notification', module)
  .add('Default', () => {
    return <Notification>{text}</Notification>;
  })
  .add('Warning', () => {
    return <Notification isWarning={true}>{text}</Notification>;
  })
  .add('Error', () => {
    return <Notification isError={true}>{text}</Notification>;
  })
  .add('Is Closable', () => {
    return (
      <Notification isClosable={true} isError={true}>
        {text}
      </Notification>
    );
  });
