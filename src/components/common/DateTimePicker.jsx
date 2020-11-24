import React, { Component } from 'react';
import { Box, Button } from '@chakra-ui/core';
import Picker from 'picker';
import moment from 'moment';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';
import enus from 'rc-picker/lib/locale/en_US';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { onCancel, onConfirm } = this.props;
    return (
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
    );
  }
}

let currentDate = moment().startOf('minute');
const range = (start, end) => {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};

class DateTimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultTime ? moment(props.defaultTime) : currentDate,
      tempValue: props.defaultTime ? moment(props.defaultTime) : currentDate,
      open: false,
    };
  }

  disabledDate = (current) => {
    return (
      current && current < currentDate.clone().subtract(1, 'days').endOf('day')
    );
  };

  disabledTime = (current) => {
    let disabledHours,
      disabledMinutes = [];
    if (current && current.isSame(currentDate, 'date')) {
      disabledHours = range(0, currentDate.clone().subtract(1, 'hours').hour());
      if (current && current.isSame(currentDate, 'hour')) {
        disabledMinutes = range(
          0,
          currentDate.clone().subtract(1, 'minutes').minute(),
        );
      }
    }
    return {
      disabledHours: () => disabledHours,
      disabledMinutes: () => disabledMinutes,
    };
  };

  onOpenChange = (open) => {
    if (open) {
      currentDate = moment().startOf('minute');
    }
  };

  onSelect = (newValue) => {
    if (newValue.isAfter(currentDate)) {
      this.setState({ tempValue: newValue });
    } else {
      this.setState({ tempValue: currentDate });
    }
  };

  onConfirm = () => {
    this.setState({ value: this.state.tempValue });
    this.props.onChange(this.state.tempValue);
    this.setState({ open: false });
  };

  onCancel = () => {
    this.setState({ open: false });
  };

  onClick = () => {
    this.setState({ open: true });
  };

  onBlur = () => {
    this.setState({ open: false });
    this.props.onBlur && this.props.onBlur();
  };

  // rc-picker 即将支持 onKeyDown 属性
  // https://github.com/react-component/picker/pull/138
  onKeyDown = (e) => {
    if (e.key === 'Escape') {
      if (this.state.open) {
        this.setState({ open: false });
        e.stopPropagation();
      }
    } else if (e.key === 'Enter') {
      this.setState({ open: true });
    }
    this.props.onKeyDown && this.props.onKeyDown();
  };

  render() {
    const { defaultTime, onBlur, onKeyDown, ...rest } = this.props;
    const { value, open, tempValue } = this.state;
    return (
      <Picker
        value={value}
        onSelect={this.onSelect}
        onClick={this.onClick}
        open={open}
        onOpenChange={this.onOpenChange}
        generateConfig={momentGenerateConfig}
        locale={enus}
        inputReadOnly
        format="DD/MM/YYYY HH:mm"
        defaultPickerValue={tempValue}
        showTime={{ showSecond: false }}
        renderExtraFooter={() => (
          <Footer onCancel={this.onCancel} onConfirm={this.onConfirm} />
        )}
        disabledTime={this.disabledTime}
        disabledDate={this.disabledDate}
        onBlur={this.onBlur}
        onKeyDown={this.onKeyDown}
        {...rest}
      ></Picker>
    );
  }
}
export default DateTimePicker;
