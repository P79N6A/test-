require('../scss/base.scss');
require('../theme/antD.less');
import React from 'react';
import ReactDOM from 'react-dom';
import BZApplicationView from './bzapplication/views/BZApplicationView';

ReactDOM.render(
  <BZApplicationView />,
  document.getElementById('bzapplication')
);
