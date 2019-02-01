require('../scss/base.scss');
require('../theme/antD.less');
import React from 'react';
import ReactDOM from 'react-dom';
import BusinessView from './yunwei/views/YunWei';

ReactDOM.render(
  <BusinessView />,
  document.getElementById('yunwei')
);
