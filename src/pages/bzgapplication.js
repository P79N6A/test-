require('../scss/base.scss');
require('../theme/antD.less');
import React from 'react';
import ReactDOM from 'react-dom';
import BZGApplicationView from './bzgapplication/views/BZGApplicationView';

ReactDOM.render(
  <BZGApplicationView />,
  document.getElementById('bzgapplication')
);
