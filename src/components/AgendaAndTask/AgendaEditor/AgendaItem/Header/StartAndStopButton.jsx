import { Box } from '@chakra-ui/core';
import React from 'react';
import Tooltip from 'tooltip';

// 会议开始结束按键
const ActionButton = ({ overlay, onClick, Icon }) => (
  <Box contentEditable={false}>
    <Tooltip overlay={overlay} placement="top" align={{ offset: [0, 2] }}>
      <Box width="20px" p="2px" cursor="pointer" onClick={onClick}>
        <Icon size="16px" />
      </Box>
    </Tooltip>
  </Box>
);

export default ActionButton;
