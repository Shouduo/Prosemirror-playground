import React from 'react';
import styled from '@emotion/styled';
import Tooltip from 'rc-tooltip';

const RCTooltip = ({ children, className, ...rest }) => (
  <Tooltip {...rest} overlayClassName={className} mouseLeaveDelay={0}>
    {children}
  </Tooltip>
);

export default styled(RCTooltip)`
  &.rc-tooltip {
    position: absolute;
    z-index: 1070;
    display: block;
    visibility: visible;
    font-size: 13px;
    line-height: 18px;
    &-hidden {
      display: none;
    }

    &-placement-top,
    &-placement-topLeft,
    &-placement-topRight {
      padding: 5px 0 9px 0;
    }
    &-placement-right,
    &-placement-rightTop,
    &-placement-rightBottom {
      padding: 0 5px 0 9px;
    }
    &-placement-bottom,
    &-placement-bottomLeft,
    &-placement-bottomRight {
      padding: 9px 0 5px 0;
    }
    &-placement-left,
    &-placement-leftTop,
    &-placement-leftBottom {
      padding: 0 9px 0 5px;
    }
  }

  .rc-tooltip-inner {
    padding: 5px 10px;
    color: ${(props) => props.theme.colors.white};
    text-align: left;
    text-decoration: none;
    background-color: ${(props) => props.theme.colors.gray['800']};
    border-radius: 4px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.17);
    min-height: 28px;
    max-width: ${(props) => props.maxWidth};
  }

  .rc-tooltip-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
  }

  &.rc-tooltip {
    &-placement-top,
    &-placement-topLeft,
    &-placement-topRight {
      .rc-tooltip-arrow {
        bottom: 4px;
        margin-left: -5px;
        border-width: 5px 5px 0;
        border-top-color: ${(props) => props.theme.colors.gray['800']};
      }
    }

    &-placement-top {
      .rc-tooltip-arrow {
        left: 50%;
      }
    }

    &-placement-topLeft {
      .rc-tooltip-arrow {
        left: 15%;
      }
    }

    &-placement-topRight {
      .rc-tooltip-arrow {
        right: 15%;
      }
    }

    &-placement-right,
    &-placement-rightTop,
    &-placement-rightBottom {
      .rc-tooltip-arrow {
        left: 4px;
        margin-top: -5px;
        border-width: 5px 5px 5px 0;
        border-right-color: ${(props) => props.theme.colors.gray['800']};
      }
    }

    &-placement-right {
      .rc-tooltip-arrow {
        top: 50%;
      }
    }

    &-placement-rightTop {
      .rc-tooltip-arrow {
        top: 15%;
        margin-top: 0;
      }
    }

    &-placement-rightBottom {
      .rc-tooltip-arrow {
        bottom: 15%;
      }
    }

    &-placement-left,
    &-placement-leftTop,
    &-placement-leftBottom {
      .rc-tooltip-arrow {
        right: 4px;
        margin-top: -5px;
        border-width: 5px 0 5px 5px;
        border-left-color: ${(props) => props.theme.colors.gray['800']};
      }
    }

    &-placement-left {
      .rc-tooltip-arrow {
        top: 50%;
      }
    }

    &-placement-leftTop {
      .rc-tooltip-arrow {
        top: 15%;
        margin-top: 0;
      }
    }

    &-placement-leftBottom {
      .rc-tooltip-arrow {
        bottom: 15%;
      }
    }

    &-placement-bottom,
    &-placement-bottomLeft,
    &-placement-bottomRight {
      .rc-tooltip-arrow {
        top: 4px;
        margin-left: -5px;
        border-width: 0 5px 5px;
        border-bottom-color: ${({ theme }) => theme.colors.gray['800']};
      }
    }

    &-placement-bottom {
      .rc-tooltip-arrow {
        left: 50%;
      }
    }

    &-placement-bottomLeft {
      .rc-tooltip-arrow {
        left: 15%;
      }
    }

    &-placement-bottomRight {
      .rc-tooltip-arrow {
        right: 15%;
      }
    }
  }
`;
