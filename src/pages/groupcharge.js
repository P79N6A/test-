require('../scss/base.scss');
require('../theme/antD.less');
import React from 'react';
import ReactDOM from 'react-dom';
import GroupCharge from './groupcharge/views/GroupChargeView';

// import { Table } from 'antd';

// ReactDOM.render(
//   <PaginationTable />,
//   document.getElementById('groupcharge')
// );
ReactDOM.render(
  <GroupCharge />,
  document.getElementById('groupcharge')
);
