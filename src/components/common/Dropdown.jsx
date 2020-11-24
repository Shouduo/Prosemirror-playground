import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Box } from '@chakra-ui/core';
import Dropdown from 'rc-dropdown';
import {
  slideUpIn,
  slideUpOut,
  slideDownIn,
  slideDownOut,
} from '@/assets/theme/motion';

const RCDropdown = ({ children, className, ...rest }) => (
  <Dropdown animation="slide-up" overlayClassName={className} {...rest}>
    {children}
  </Dropdown>
);

const effect = () =>
  css`
    animation-duration: 0.2s;
    animation-fill-mode: both;
    transform-origin: 0 0;
    display: block !important;
  `;

export const DropdownBG = ({ children, ...props }) => (
  <Box p="8px" bg="white" borderRadius="12px" boxShadow="gray.200" {...props}>
    {children}
  </Box>
);

export default styled(RCDropdown)`
  &.rc-dropdown {
    position: absolute;
    left: -9999px;
    top: -9999px;
    z-index: 1070;
    display: block;
    line-height: 1.5;

    &-hidden {
      display: none;
    }

    &-slide-up-enter,
    &-slide-up-appear {
      ${effect};
      opacity: 0;
      animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
      animation-play-state: paused;
    }

    &-slide-up-leave {
      ${effect};
      opacity: 1;
      animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.34);
      animation-play-state: paused;
    }

    &-slide-up-enter&-slide-up-enter-active&-placement-bottomLeft,
    &-slide-up-appear&-slide-up-appear-active&-placement-bottomLeft,
    &-slide-up-enter&-slide-up-enter-active&-placement-bottomCenter,
    &-slide-up-appear&-slide-up-appear-active&-placement-bottomCenter,
    &-slide-up-enter&-slide-up-enter-active&-placement-bottomRight,
    &-slide-up-appear&-slide-up-appear-active&-placement-bottomRight {
      animation-name: ${slideUpIn};
      animation-play-state: running;
    }

    &-slide-up-enter&-slide-up-enter-active&-placement-topLeft,
    &-slide-up-appear&-slide-up-appear-active&-placement-topLeft,
    &-slide-up-enter&-slide-up-enter-active&-placement-topCenter,
    &-slide-up-appear&-slide-up-appear-active&-placement-topCenter,
    &-slide-up-enter&-slide-up-enter-active&-placement-topRight,
    &-slide-up-appear&-slide-up-appear-active&-placement-topRight {
      animation-name: ${slideDownIn};
      animation-play-state: running;
    }

    &-slide-up-leave&-slide-up-leave-active&-placement-bottomLeft,
    &-slide-up-leave&-slide-up-leave-active&-placement-bottomCenter,
    &-slide-up-leave&-slide-up-leave-active&-placement-bottomRight {
      animation-name: ${slideUpOut};
      animation-play-state: running;
    }

    &-slide-up-leave&-slide-up-leave-active&-placement-topLeft,
    &-slide-up-leave&-slide-up-leave-active&-placement-topCenter,
    &-slide-up-leave&-slide-up-leave-active&-placement-topRight {
      animation-name: ${slideDownOut};
      animation-play-state: running;
    }
  }

  // arrows
  .rc-dropdown-arrow {
    position: absolute;
    border-width: 4px;
    border-color: transparent;
    box-shadow: ${({ theme }) => theme.shadows.gray['100']};
    border-style: solid;
    transform: rotate(45deg);
  }

  &.rc-dropdown {
    // adjust padding
    &-show-arrow&-placement-top,
    &-show-arrow&-placement-topLeft,
    &-show-arrow&-placement-topRight {
      padding-bottom: 6px;
    }

    &-show-arrow&-placement-bottom,
    &-show-arrow&-placement-bottomLeft,
    &-show-arrow&-placement-bottomRight {
      padding-top: 6px;
    }

    // top-*
    &-placement-top,
    &-placement-topLeft,
    &-placement-topRight {
      .rc-dropdown-arrow {
        bottom: 4px;
        border-top-color: white;
      }
    }

    &-placement-top {
      .rc-dropdown-arrow {
        left: 50%;
      }
    }

    &-placement-topLeft {
      .rc-dropdown-arrow {
        left: 15%;
      }
    }

    &-placement-topRight {
      .rc-dropdown-arrow {
        right: 15%;
      }
    }

    // bottom-*
    &-placement-bottom,
    &-placement-bottomLeft,
    &-placement-bottomRight {
      .rc-dropdown-arrow {
        top: 4px;
        border-bottom-color: white;
      }
    }

    &-placement-bottom {
      .rc-dropdown-arrow {
        left: 50%;
      }
    }

    &-placement-bottomLeft {
      .rc-dropdown-arrow {
        left: 15%;
      }
    }

    &-placement-bottomRight {
      .rc-dropdown-arrow {
        right: 15%;
      }
    }
  }
`;
