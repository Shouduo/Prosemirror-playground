import React from 'react';
import { Global } from '@emotion/core';
import { panelCSS } from 'picker';

export default (props) => <Global styles={panelCSS(props)} />;
