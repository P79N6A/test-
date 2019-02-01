require('./PageContentView.scss');
import React, { Component } from 'react';
import HeaderView from './HeaderView';
import SliderMenuView from './SliderMenuView';
import { Layout } from 'antd';

const { Content } = Layout;

export default class PageContentView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { headerMenuKeys, sliderMenuKeys, sliderConfig } = this.props;
    return (
      <Layout className="page-mian-layout">
        <HeaderView theme={'dark'} currNavMenuKeys={headerMenuKeys}/>
        <Layout>
          <SliderMenuView sliderMenuKeys={sliderMenuKeys} sliderConfig={sliderConfig}/>
          <Layout style={{ paddingLeft: 8 }}>
            <Content style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 280,
              overflow: 'scroll',
            }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
