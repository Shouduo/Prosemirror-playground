import React, { useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';

// tab with animation
const TabItem = ({ children, isLast, ...props }) => (
  <Box
    as="button"
    flex="1"
    height="40px"
    py="8px"
    borderRadius="8px"
    textAlign="center"
    zIndex="2"
    cursor="pointer"
    mr={isLast ? '0' : '8px'}
    {...props}
  >
    {children}
  </Box>
);

const SelectedBackground = ({ currentIndex, count, ...props }) => (
  <Box
    bg="white"
    borderRadius="8px"
    position="absolute"
    top="4px"
    left="4px"
    width={`calc(${100 / count}% - 8px)`}
    height="40px"
    transform={`translate(calc(${100 * currentIndex}% + ${
      currentIndex * 8
    }px))`}
    transition="transform 0.2s"
    zIndex="1"
    {...props}
  />
);

export default ({
  items,
  defaultSelected = 0,
  onTabChange,
  borderRadius = '8px',
  itemBorderRadius = '8px',
}) => {
  const [currentIndex, setCurrentIndex] = useState(defaultSelected);
  const count = items.length;
  const toggleTab = (item, index) => {
    setCurrentIndex(index);
    onTabChange && onTabChange(item);
  };
  return (
    <Flex
      position="relative"
      bg="gray.100"
      borderRadius={borderRadius}
      mb="16px"
      p="4px"
    >
      <SelectedBackground
        currentIndex={currentIndex}
        count={count}
        borderRadius={itemBorderRadius}
      />
      {items.map((item, index) => (
        <TabItem
          key={item.key}
          onClick={() => toggleTab(item, index)}
          isLast={index === count - 1}
          aria-label={item.label}
          borderRadius={itemBorderRadius}
        >
          <Text d="inline">{item.label}</Text>
          {item.sublabel && (
            <Text d="inline" color="gray.500" fontSize="xs" ml={1}>
              {item.sublabel}
            </Text>
          )}
        </TabItem>
      ))}
    </Flex>
  );
};
