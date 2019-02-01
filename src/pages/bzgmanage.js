require('../scss/base.scss');
require('../theme/antD.less');
import React from 'react';
import ReactDOM from 'react-dom';
import BZGManageView from './bzgmanage/views/BZGManageView';

ReactDOM.render(
  <BZGManageView />,
  document.getElementById('app')
);
