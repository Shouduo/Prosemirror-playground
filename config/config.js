import { defineConfig } from 'umi';
import { resolve } from 'path';
import Dotenv from 'dotenv-webpack';
import envPath from './env';

const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  alias: {
    tooltip: '@/components/common/Tooltip',
    picker: '@/components/common/Picker',
    dropdown: '@/components/common/Dropdown',
    menu: '@/components/common/Menu',
    tabs: '@/components/common/Tabs',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  chainWebpack(config) {
    config
      .plugin('env')
      .use(Dotenv, [
        { path: envPath(), defaults: resolve(__dirname, '../.env') },
      ]);
    config.module
      .rule('lint')
      .test(/\.js(x)?$/)
      .pre()
      .include.add(resolve(__dirname, '../src'))
      .end()
      .use('eslint')
      .loader('eslint-loader')
      .options({
        configFile: isDev ? './.eslintrc.dev' : './.eslintrc.prod',
      });
    config.module
      .rule('otf')
      .test(/.otf$/)
      .use('file-loader')
      .loader('file-loader');
  },
});
