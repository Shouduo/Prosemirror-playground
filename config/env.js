import { resolve } from 'path';
import argv from 'minimist';

const mode = argv(process.argv).mode;

export default () => {
  if (process.env.NODE_ENV === 'development') {
    return resolve(__dirname, '../.env.development');
  } else if (process.env.NODE_ENV === 'production') {
    return resolve(__dirname, '../.env.production');
  } else {
    return resolve(__dirname, `../.env${mode === 'test' ? `.${mode}` : ``}`);
  }
};
