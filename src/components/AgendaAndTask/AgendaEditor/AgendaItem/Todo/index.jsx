import React from 'react';
import { Box, Flex, Checkbox, Avatar, Tag } from '@chakra-ui/core';
import { CheckboxX as CheckboxIcon, Calendar } from 'react-notticon';
import AssigneeDropdown, { attendees } from './AssigneeDropdown';
import DeadlineDropdown from './DeadlineDropdown';
import Tooltip from 'tooltip';
import styled from '@emotion/styled';
import _ from 'lodash';
import moment from 'moment';
import theme from '@/assets/theme';

const TodoWrapper = styled(Flex)`
  &:hover {
    .todo-handler {
      display: block;
    }
  }
`;

const Todo = ({
  children,
  dom,
  contentDOM,
  node,
  view,
  getPos,
  setAttrsAndType,
  innerRef,
}) => {
  const attrs = node.attrs;
  // 当 checkbox 被点击时
  const onCheckboxClick = () => {
    setAttrsAndType({ checked: 1 - attrs.checked });
  };
  // 当选择责任人
  const onSelectAssignee = ({ key }) => {
    const assignee = _.find(attendees, (a) => a.uid === key);
    const { uid, nickname } = assignee;
    setAttrsAndType({ assigneeUid: uid, assigneeNickname: nickname });
  };
  // 当 todo 的 deadline 修改确认时
  const onDateConfirm = (date) => {
    setAttrsAndType({ deadline: moment(date).startOf('day').valueOf() });
  };
  // 时间标签主题样式
  const timeTagColorschemer = (deadline) => {
    const todayDate = moment().startOf('day');
    return {
      backgroundColor: todayDate.isAfter(deadline, 'day')
        ? theme.colors.red['100']
        : todayDate.isSame(deadline, 'day')
        ? theme.colors.orange['100']
        : theme.colors.gray['100'],
      color: todayDate.isAfter(deadline, 'day')
        ? theme.colors.red['400']
        : todayDate.isSame(deadline, 'day')
        ? theme.colors.orange['400']
        : theme.colors.gray['400'],
    };
  };
  // 转换 type
  const convertBlock = () => {
    setAttrsAndType({}, 'paragraph');
  };
  return (
    <TodoWrapper alignItems="flex-start" pos="relative" mb="12px">
      <Box
        className="todo-handler"
        display="none"
        pos="absolute"
        left="-40px"
        width="40px"
        color="red.500"
        userSelect="none"
        _hover={{ color: 'red.700' }}
        contentEditable={false}
      >
        <Tooltip
          placement="top"
          overlay="Convert to paragraph"
          align={{ offset: [0, 4] }}
        >
          <Box w="24px" p="4px" cursor="pointer" onClick={convertBlock}>
            <CheckboxIcon size="16px" />
          </Box>
        </Tooltip>
      </Box>
      <Checkbox
        isChecked={attrs.checked === 1}
        onChange={onCheckboxClick}
        contentEditable={false}
        my="4px"
        mr="8px"
      />
      <Box
        h="24px"
        flex="1"
        ref={innerRef}
        textDecoration={attrs.checked === 1 ? 'line-through' : ''}
      ></Box>
      <Flex h="24px" userSelect="none" contentEditable={false}>
        <DeadlineDropdown
          onConfirm={onDateConfirm}
          defaultTime={attrs.deadline}
        >
          {attrs.deadline ? (
            <Tag
              size="sm"
              borderRadius="md"
              {...timeTagColorschemer(attrs.deadline)}
            >
              {moment(attrs.deadline).format('DD/MM/YYYY')}
            </Tag>
          ) : (
            <Calendar size="16px" mr="4px" />
          )}
        </DeadlineDropdown>
        <AssigneeDropdown attendees={attendees} onSelect={onSelectAssignee}>
          <Avatar size="xs" name={attrs.assigneeNickname} />
        </AssigneeDropdown>
      </Flex>
    </TodoWrapper>
  );
};

export default React.forwardRef((props, ref) => (
  <Todo innerRef={ref} {...props} />
));
