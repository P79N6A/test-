require('../scss/base.scss');
require('../theme/antD.less');
import React from 'react';
import ReactDOM from 'react-dom';
import Feedback from './feedback/views/FeedBackView';

ReactDOM.render(
  <Feedback />,
  document.getElementById('feedback')
);
