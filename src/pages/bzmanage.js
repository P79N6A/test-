require('../scss/base.scss');
require('../theme/antD.less');
import React from 'react';
import ReactDOM from 'react-dom';
import BusinessView from './bzmanage/views/BZManageView';

ReactDOM.render(
  <BusinessView />,
  document.getElementById('app')
);
