import styled from '@emotion/styled';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';

export default styled(Menu)`
  &.rc-dropdown-menu,
  &.rc-menu {
    outline: none;
    position: relative;
    list-style-type: none;
    padding: 8px;
    margin: 2px 0 2px;
    text-align: left;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 12px;
    box-shadow: ${({ theme }) => theme.shadows.gray['200']};
    background-clip: padding-box;

    > li {
      margin: 0;
      padding: 0;
    }

    &:before {
      content: '';
      position: absolute;
      top: -4px;
      left: 0;
      width: 100%;
      height: 4px;
      background: ${({ theme }) => theme.colors.white};
      background: rgba(255, 255, 255, 0.01);
    }

    .rc-dropdown-menu-item,
    .rc-menu-item {
      position: relative;
      display: block;
      padding: 8px 16px;
      border-radius: 8px;
      clear: both;
      color: ${({ theme }) => theme.colors.gray['900']};
      white-space: nowrap;
      transition: background-color 0.2s;
      cursor: pointer;

      &:hover {
        background-color: ${({ theme }) => theme.colors.gray['100']};
      }
      &:active,
      &-active,
      &-selected {
        background-color: ${({ theme }) => theme.colors.gray['200']};
      }

      &-disabled {
        color: ${({ theme }) => theme.colors.gray['300']};
        cursor: not-allowed;
        pointer-events: none;

        &:hover {
          color: ${({ theme }) => theme.colors.gray['300']};
          background-color: ${({ theme }) => theme.colors.white};
          cursor: not-allowed;
        }
      }

      &-divider {
        height: 1px;
        margin: 4px 0;
        overflow: hidden;
        background-color: ${({ theme }) => theme.colors.gray['100']};
        line-height: 0;
      }
    }
  }
  &.icon-menu {
    padding: 4px;
    border-radius: 8px;
    .rc-dropdown-menu-item,
    .rc-menu-item {
      position: relative;
      display: block;
      padding: 4px;
    }
  }
`;

export { MenuItem, Divider };
