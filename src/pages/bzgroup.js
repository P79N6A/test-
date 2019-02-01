require('../scss/base.scss');
require('../theme/antD.less');
import React from 'react';
import ReactDOM from 'react-dom';
import BZGroupView from './bzgroup/views/BZGroupView';

ReactDOM.render(
  <BZGroupView />,
  document.getElementById('app')
);
