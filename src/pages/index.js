require('../scss/base.scss');
require('../theme/antD.less');
import React from 'react';
import ReactDOM from 'react-dom';
import IndexView from './index/views/IndexView';
ReactDOM.render(
  <IndexView />,
  document.getElementById('main')
);
