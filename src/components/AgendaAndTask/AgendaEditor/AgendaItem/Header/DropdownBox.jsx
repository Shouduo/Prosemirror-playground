import React from 'react';
// import Dropdown from 'dropdown';
import Dropdown from 'rc-dropdown';
import Tooltip from 'tooltip';
import Menu, { MenuItem, Divider } from 'menu';
import { Tag } from '@chakra-ui/core';
import { fromatSecondToDigital } from '@/utils/time.js';

const modifyDuration = (s) => {
  console.log('modifyDuration:', s);
};

const CountdownSelector = ({ onSelect, onClick }) => (
  <Menu
    onClick={(e) => {
      onSelect(e);
      onClick(e);
    }}
  >
    <MenuItem key={1}>Add 1min</MenuItem>
    <Divider />
    <MenuItem key={3}>Add 3mins</MenuItem>
    <MenuItem key={5}>Add 5mins</MenuItem>
    <MenuItem key={10}>Add 10mins</MenuItem>
  </Menu>
);

export default function DropdownBox({
  setRef,
  onVisibleChange,
  portal,
  value,
  status,
}) {
  return (
    <Dropdown
      className="dropdown-demo"
      overlayClassName="set-portal"
      contentEditable={false}
      overlay={
        <CountdownSelector onSelect={modifyDuration} onClick={() => {}} />
      }
      onVisibleChange={onVisibleChange}
      trigger={['click']}
      placement="bottomCenter"
    >
      <Tooltip
        overlay="Change duration"
        placement="top"
        align={{ offset: [0, 2] }}
      >
        <Tag
          size="sm"
          bg="transparent"
          _hover={{ bg: 'gray.100' }}
          cursor="pointer"
        >
          {status === 'countdown' ? fromatSecondToDigital(value) : value}
        </Tag>
      </Tooltip>
    </Dropdown>
  );
}
