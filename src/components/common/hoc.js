import styled from '@emotion/styled';

export const noScrollbar = (Component) =>
  styled(Component)`
    &::-webkit-scrollbar {
      display: none;
    }
  `;
