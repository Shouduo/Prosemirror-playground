import { Flex, Box, Tag, Button, Text } from '@chakra-ui/core';
import React from 'react';
import Dropdown from 'dropdown';
import Menu, { MenuItem, Divider } from 'menu';
import Tooltip from 'tooltip';
import { Play, Stop } from 'react-notticon';
import { updateDataOfBlock } from 'editor/utils';
import { AGENDA_DURATIONS } from '@/utils/constant';

export const TimeSelector = ({ onSelect, onClick }) => (
  // 加 `onClick` 是为了让点击后关闭下拉菜单
  <Menu
    onClick={(e) => {
      onSelect(e);
      onClick(e);
    }}
  >
    {Object.keys(AGENDA_DURATIONS).map((key) => (
      <MenuItem key={key - 0}>{AGENDA_DURATIONS[key]}</MenuItem>
    ))}
    <Divider />
    <MenuItem key={0}>none</MenuItem>
  </Menu>
);

export const CountdownSelector = ({ onSelect, onClick }) => (
  <Menu
    onClick={(e) => {
      onSelect(e);
      onClick(e);
    }}
  >
    <MenuItem key={1}>Add 1min</MenuItem>
    <MenuItem key={3}>Add 3mins</MenuItem>
    <MenuItem key={5}>Add 5mins</MenuItem>
    <MenuItem key={10}>Add 10mins</MenuItem>
  </Menu>
);

startCount = () => {
  const data = this.props.block.getData();
  const planDuration = data.get('planDuration');
  this.setState(
    {
      status: 'countdown',
      leftTime: planDuration,
    },
    () => {
      this.timer = setInterval(() => {
        const { leftTime, addedDuration } = this.state;
        if (leftTime === 0) {
          this.stopCount();
        }
        this.setState({
          leftTime: leftTime - 1,
          progress: ((leftTime - 1) * 100) / (planDuration + addedDuration),
        });
      }, 1000);
    },
  );
};

stopCount = () => {
  // 停止计时
  clearInterval(this.timer);
  const { block, blockProps } = this.props;
  const { onChange, getEditorState } = blockProps;
  const data = block.getData();
  const { leftTime, addedDuration } = this.state;
  const planDuration = data.get('planDuration');
  // 实际时间等于计划时间减去剩余时间
  const realDuration = planDuration + addedDuration - leftTime;
  const newData = data.set('realDuration', realDuration).set('isDone', 1);
  onChange(updateDataOfBlock(getEditorState(), block, newData));
  this.setState({
    status: 'done',
  });
};

modifyDuration = ({ key }) => {
  const addedTime = key - 0;
  const { leftTime, addedDuration } = this.state;
  this.setState({
    leftTime: leftTime + addedTime * 60,
    addedDuration: addedDuration + addedTime * 60,
  });
};
