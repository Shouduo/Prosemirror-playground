import React from 'react';
import {
  Tabs as RawTabs,
  TabList as RawTabList,
  Tab as RawTab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/core';

// 先粗暴地在这里重写，等 Chakra 发布新版本后改为合并 variants function 的方式
// https://github.com/chakra-ui/chakra-ui/pull/1967
export const Tabs = ({ children, ...props }) => (
  <RawTabs variant="unstyled" {...props}>
    {children}
  </RawTabs>
);

export const TabList = ({ children, ...props }) => (
  <RawTabList borderBottom="1px solid" borderColor="gray.100">
    {children}
  </RawTabList>
);

export const Tab = ({ children, ...props }) => (
  <RawTab
    {...props}
    marginBottom="-2px"
    borderBottom="3px solid transparent"
    _selected={{ borderBottom: '3px solid', borderColor: 'blue.500' }}
  >
    {children}
  </RawTab>
);

export { TabPanels, TabPanel };
