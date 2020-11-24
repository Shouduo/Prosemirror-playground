import React, { Component } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/core';
import { PickerPanel, momentGenerateConfig, enUS } from 'picker';
import moment from 'moment';
import PropTypes from 'prop-types';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { onCancel, onConfirm, onToday } = this.props;
    return (
      <Flex direction="row" justify="space-between" alignItems="center">
        <Box>
          <Text cursor="pointer" onClick={onToday}>
            Today
          </Text>
        </Box>
        <Box>
          <Button
            onClick={onCancel}
            className="rc-picker-footer-extra-cancel-button"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="rc-picker-footer-extra-confirm-button"
          >
            Confirm
          </Button>
        </Box>
      </Flex>
    );
  }
}
Footer.propTypes = {
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  onToday: PropTypes.func,
};

let currentDate = moment().startOf('minute');

class DatePickerPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value:
        props.defaultTime && props.defaultTime !== 0
          ? moment(props.defaultTime)
          : currentDate,
    };
  }

  disabledDate = (current) => {
    return (
      current && current < currentDate.clone().subtract(1, 'days').endOf('day')
    );
  };

  onSelect = (newValue) => {
    if (newValue.isSameOrAfter(currentDate, 'day')) {
      this.setState({ value: newValue });
    }
  };

  onToday = () => {
    this.setState({ value: currentDate });
  };

  onConfirm = () => {
    this.props.onConfirm && this.props.onConfirm(this.state.value);
  };

  onCancel = () => {
    this.props.onCancel && this.props.onCancel();
  };

  render() {
    const { defaultTime, onBlur, onKeyDown, ...rest } = this.props;
    const { value } = this.state;
    return (
      <PickerPanel
        value={value}
        onSelect={this.onSelect}
        generateConfig={momentGenerateConfig}
        locale={enUS}
        format="DD/MM/YYYY"
        renderExtraFooter={() => (
          <Footer
            onCancel={this.onCancel}
            onConfirm={this.onConfirm}
            onToday={this.onToday}
          />
        )}
        disabledDate={this.disabledDate}
        {...rest}
      />
    );
  }
}

DatePickerPanel.propTypes = {
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  defaultTime: PropTypes.number, // ms 时间戳
};

export default DatePickerPanel;
