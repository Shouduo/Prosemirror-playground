import { keyframes } from '@emotion/core';

export const slideUpIn = keyframes`
  0% {
    opacity: 0;
    transform-origin: 0% 0%;
    transform: translateY(-8px);
  }
  100% {
    opacity: 1;
    transform-origin: 0% 0%;
    transform: translateY(0);
  }
`;

export const slideUpOut = keyframes`
  0% {
    opacity: 1;
    transform-origin: 0% 0%;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform-origin: 0% 0%;
    transform: translateY(-8px);
  }
`;

export const slideDownIn = keyframes`
  0% {
    opacity: 0;
    transform-origin: 0% 100%;
    transform: translateY(-8px);
  }
  100% {
    opacity: 1;
    transform-origin: 0% 100%;
    transform: translateY(0);
  }
`;

export const slideDownOut = keyframes`
  0% {
    opacity: 1;
    transform-origin: 0% 100%;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform-origin: 0% 100%;
    transform: translateY(-8px);
  }
`;
