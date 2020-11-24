import React from 'react';
import styled from '@emotion/styled';
import { Box } from '@chakra-ui/core';
import { Checkbox } from 'react-notticon';
import Tooltip from 'tooltip';
import { getUuid } from '@/utils/public';

const ParagraphWrapper = styled(Box)`
  &:hover {
    .paragraph-handler {
      display: block;
    }
  }
`;

const Paragraph = ({
  children,
  dom,
  contentDOM,
  node,
  view,
  getPos,
  setAttrsAndType,
  innerRef,
  user,
}) => {
  // 转换 type
  const convertBlock = () => {
    const newTodoAttrs = {
      taskId: getUuid(),
      creatorUid: 'user.uid', // 任务创建者 id
      assigneeUid: 'user.uid', // 负责人 id
      assigneeNickname: 'user.nickname', // 负责人姓名
      assigneeAvatar: 'user.avatar', // 负责人头像
      deadline: 0, // 期限, ms 级, 精确到某天的零时零分零秒
      checked: 0, // 0-未完成, 1-已完成
    };
    setAttrsAndType(newTodoAttrs, 'todo');
  };
  return (
    <ParagraphWrapper pos="relative" mb="12px">
      <Box
        className="paragraph-handler"
        display="none"
        pos="absolute"
        left="-40px"
        w="40px"
        userSelect="none"
        contentEditable={false}
      >
        <Tooltip
          overlay="Convert to task"
          placement="top"
          align={{ offset: [0, 4] }}
        >
          <Box
            width="24px"
            p="4px"
            color="gray.400"
            cursor="pointer"
            _hover={{ color: 'blue.500' }}
            onClick={convertBlock}
          >
            <Checkbox size="16px" />
          </Box>
        </Tooltip>
      </Box>
      <Box flex="1" ref={innerRef} h="24px"></Box>
    </ParagraphWrapper>
  );
};

export default React.forwardRef((props, ref) => (
  <Paragraph innerRef={ref} {...props} />
));
