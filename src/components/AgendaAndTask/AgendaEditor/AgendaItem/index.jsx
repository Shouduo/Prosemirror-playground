import { Box, Flex } from '@chakra-ui/core';
import React, { forwardRef } from 'react';
import styled from '@emotion/styled';
import { DotSix, Trash } from 'react-notticon';
import Dropdown from 'dropdown';
import Menu, { MenuItem } from 'menu';

const EditorWrapper = styled(Flex)`
  &:hover {
    .drag-handler {
      display: block;
    }
  }
  .rc-dropdown-open.drag-handler {
    display: block;
  }
  &.agenda-item-dragging {
    box-shadow: ${({ theme }) => theme.shadows.gray['200']};
    .drag-handler {
      display: block;
    }
  }
`;

const DeleteMenu = ({ onClick }) => (
  <Menu className="icon-menu">
    <MenuItem onClick={onClick}>
      <Box as={Trash} width="16px" height="16px" color="red.500" />
    </MenuItem>
  </Menu>
);

// 拖拽排序把手
const DragHandler = ({ onDeleteClick }) => (
  <Dropdown
    overlay={<DeleteMenu onClick={onDeleteClick} />}
    trigger={['click']}
    placement="bottomCenter"
  >
    <Box
      className="drag-handler"
      display="none"
      pos="absolute"
      left="-24px"
      cursor="move"
      color="gray.400"
      _hover={{ color: 'gray.900' }}
    >
      <DotSix />
    </Box>
  </Dropdown>
);

const AgendaItem = forwardRef(
  ({ children, dom, contentDOM, node, getPos, onDelete }, ref) => {
    return (
      <EditorWrapper
        pos="relative"
        mb="16px"
        p="16px"
        bg="white"
        w="100%"
        className="EditorWrapper"
        borderRadius="8px"
        ref={ref}
      >
        <DragHandler contentEditable={false} onDeleteClick={onDelete} />
      </EditorWrapper>
    );
  },
);

export default AgendaItem;
