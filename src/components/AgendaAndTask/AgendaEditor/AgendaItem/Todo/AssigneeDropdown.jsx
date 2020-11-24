import React, { Component } from 'react';
import { Box, Avatar } from '@chakra-ui/core';
import Tooltip from 'tooltip';
import Menu, { MenuItem } from 'menu';
import Dropdown from 'dropdown';

export const attendees = [
  {
    uid: '45678905',
    nickname: 'Jon',
  },
  {
    uid: '05678892',
    nickname: 'Morty',
  },
  {
    uid: '08782323',
    nickname: 'Tars',
  },
];

const AttendeesMenu = ({ onSelect, onClick }) => (
  <Menu
    style={{ width: '220px' }}
    onClick={(e) => {
      onSelect(e);
      onClick(e);
    }}
  >
    {attendees.map((attendee) => (
      <MenuItem key={attendee.uid}>
        <Avatar size="xs" name={attendee.nickname || 'Jon'} />{' '}
        {attendee.nickname || 'Jon'}
      </MenuItem>
    ))}
  </Menu>
);

class AssigneeDropdown extends Component {
  render() {
    const { children, onSelect } = this.props;
    return (
      <Dropdown
        overlay={<AttendeesMenu onSelect={onSelect} />}
        trigger={['click']}
        placement="bottomCenter"
      >
        <Box cursor="pointer">
          <Tooltip placement="top" overlay="Select assignee">
            <Box>{children}</Box>
          </Tooltip>
        </Box>
      </Dropdown>
    );
  }
}

export default AssigneeDropdown;
