require('../scss/base.scss');
require('../theme/antD.less');
import React from 'react';
import ReactDOM from 'react-dom';
import DemoView from './demo/views/DemoView';

ReactDOM.render(
  <DemoView />,
  document.getElementById('app')
);
