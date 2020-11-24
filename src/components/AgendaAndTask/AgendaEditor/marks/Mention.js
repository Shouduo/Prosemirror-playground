import React, { forwardRef } from 'react';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';
import { Link, Flex, Avatar, Box, Heading, Text } from '@chakra-ui/core';

export const mentionMarkSpec = {
  attrs: { username: {} },
  toDOM(node) {
    return ['a', { href: `https://twitter.com/${node.attrs.username}` }];
  },
  parseDOM: [
    {
      tag: 'a',
      getAttrs(dom) {
        return { href: dom.href };
      },
    },
  ],
  inclusive: false,
};

const Card = () => (
  <Flex>
    <Avatar src="https://pbs.twimg.com/profile_images/1184135296566251520/TWYoDqir_400x400.png" />
    <Box>
      <Heading as="h3" fontSize="xl">
        Figma
      </Heading>
      <Text>A design platform for teams who build products together.</Text>
    </Box>
  </Flex>
);

const Mention = forwardRef(
  ({ children, dom, contentDOM, node, getPos }, ref) => {
    const link = `https://twitter.com/${node?.attrs.username}`;
    return (
      <Tooltip placement="top" overlay={<Card />}>
        <Link ref={ref} href={link} color="blue.500">
          {children}
        </Link>
      </Tooltip>
    );
  },
);

export default Mention;
