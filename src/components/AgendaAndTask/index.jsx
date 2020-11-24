import React, { Component } from 'react';
import { Box } from '@chakra-ui/core';
import { Tabs, TabList, Tab, TabPanels as RawTabPanels, TabPanel } from 'tabs';
import { noScrollbar } from '@/components/common/hoc';
import AgendaEditor from './AgendaEditor';
const TabPanels = noScrollbar(RawTabPanels);

class AgendaAndTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      agendaItems: [],
    };
  }
  onChange = (value) => {
    // console.log('onChange -> value', value);
  };
  render() {
    return (
      <Tabs variant="unstyled">
        <Box pl="24px">
          <TabList>
            <Tab>agenda</Tab>
          </TabList>
        </Box>
        <TabPanels overflow="auto" pl="24px" py="16px">
          <TabPanel p="0">
            <AgendaEditor onChange={this.onChange} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    );
  }
}

export default AgendaAndTask;
