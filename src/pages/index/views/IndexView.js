require('./IndexView.scss');
import React, { Component } from 'react';
import HeaderView from '../../../common/components/HeaderView';

export default class IndexView extends Component {
  render() {
    return (
      <div className="app-container">
        <HeaderView theme={'dark'}/>
        <div className="app-content">
          <h1>风险中台.</h1>
          <h2 className="test">首页</h2>
          <h3 className="test">建设中...</h3>
        </div>
      </div>
    );
  }
}
