import { extendTheme } from '@chakra-ui/core';
import { mode } from '@chakra-ui/theme-tools';
import colors from './palette';
import shadows from './shadows';

const customTheme = extendTheme({
  styles: {
    global: (props) => ({
      // 保留原有属性
      fontFamily: 'body',
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('white', 'gray.800')(props),
      lineHeight: 'base',
      html: {
        scrollBehavior: 'smooth',
      },
      '*::placeholder': {
        color: mode('gray.400', 'whiteAlpha.400')(props),
      },
      '*, *::before, &::after': {
        borderColor: mode('gray.200', 'whiteAlpha.300')(props),
        wordWrap: 'break-word',
      },
      fontFeatureSettings: `"pnum"`,
      fontVariantNumeric: 'proportional-nums',
      fontSize: '15px',
      // 按下 tab 键时按钮和链接的 focus 效果
      'button:focus': {
        outline: 'none',
        boxShadow: '0 0 0 3px rgba(66,153,225,0.16)',
      },
      'div:focus': {
        outline: 'none',
        boxShadow: '0 0 0 3px rgba(66,153,225,0.16)',
      },
      b: {
        color: 'gray.900',
      },
    }),
  },
  components: {
    // 重设按钮样式
    Button: {
      baseStyle: {
        borderRadius: 'lg',
      },
      sizes: {
        md: {
          fontSize: 'md',
          height: '38px',
        },
      },
    },
    Heading: {
      sizes: {
        h1: {
          fontSize: '32px',
          fontWeight: 'normal',
        },
        h2: {
          fontSize: '24px',
          fontWeight: 'normal',
        },
        h3: {
          fontSize: '22px',
          fontWeight: 'normal',
        },
        h4: {
          fontSize: '16px',
          fontWeight: 'normal',
        },
      },
    },
  },
  colors,
  shadows,
});

export default customTheme;
