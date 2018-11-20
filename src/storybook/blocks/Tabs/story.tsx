import { storiesOf } from '@storybook/react';
import React from 'react';
import { TabContent, Tabs } from './index';

const TabsContainer = ({}) => (
  <Tabs activeTabIndex={0} handleTabClick={() => null}>
    <TabContent title="Lorem ipsum">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent interdum
      erat vulputate, vulputate nunc ut, porta sapien. Nam lobortis, metus sed
      sodales finibus, nulla diam blandit tellus.
    </TabContent>
    <TabContent title="Quisque finibus">
      Quisque finibus, metus fermentum malesuada pharetra, augue neque dictum
      mi, sed eleifend lectus dui ut felis. Donec eget ullamcorper risus. Ut id
      tempus lacus, ut imperdiet erat. Morbi urna metus.
    </TabContent>
  </Tabs>
);

storiesOf('Blocks|Tabs', module).add('Default', () => {
  return <TabsContainer />;
});
