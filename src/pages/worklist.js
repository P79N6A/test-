require('../scss/base.scss');
require('../theme/antD.less');
import React from 'react';
import ReactDOM from 'react-dom';
import WorkListView from './worklist/views/WorkListView';

ReactDOM.render(
  <WorkListView />,
  document.getElementById('worklist')
);
