import React, { Component } from 'react';
import { Box } from '@chakra-ui/core';
import Tooltip from 'tooltip';
import Dropdown, { DropdownBG } from 'dropdown';
import DatePickerPanel from '@/components/common/DatePickerPanel';

const DatePicker = ({ onConfirm, onCancel, defaultTime }) => (
  <DropdownBG>
    <DatePickerPanel
      onConfirm={onConfirm}
      onCancel={onCancel}
      defaultTime={defaultTime}
    />
  </DropdownBG>
);

class DeadlineDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  onVisibleChange = (visible) => {
    this.setState({ visible });
  };
  onCancel = () => {
    this.setState({ visible: false });
  };
  onConfirm = (date) => {
    this.setState({ visible: false });
    this.props.onConfirm && this.props.onConfirm(date);
  };
  render() {
    const { children, defaultTime } = this.props;
    const { visible } = this.state;
    return (
      <Dropdown
        overlay={
          <DatePicker
            onConfirm={this.onConfirm}
            onCancel={this.onCancel}
            defaultTime={defaultTime}
          />
        }
        trigger={['click']}
        placement="bottomCenter"
        visible={visible}
        onVisibleChange={this.onVisibleChange}
      >
        <Box>
          <Tooltip placement="top" overlay="Select deadline">
            <Box
              p="4px"
              cursor="pointer"
              color="gray.400"
              _hover={{ color: 'blue.500' }}
            >
              {children}
            </Box>
          </Tooltip>
        </Box>
      </Dropdown>
    );
  }
}

export default DeadlineDropdown;
