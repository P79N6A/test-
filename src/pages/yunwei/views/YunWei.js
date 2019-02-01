require('./YunWei.scss');
import React, { Component } from 'react';
import PageContentView from '../../../common/components/PageContentView';
import { Select, Spin, Icon, Divider, Card } from 'antd';
import debounce from 'lodash/debounce';

const Option = Select.Option;

export default class BusinessView extends Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchUser = debounce(this.fetchUser, 800);
    this.state = {
      data: [],
      value: [],
      fetching: false,
    };
    this.fetchUser = this.fetchUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  fetchUser(value) {
    console.log('fetching user', value);
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ data: [], fetching: true });
    fetch('https://magellan-doc.online.qiyi.qae/api/opt/auth/member_list/?results=5')
      .then(response => response.json())
      .then((body) => {
        if (fetchId !== this.lastFetchId) { // for fetch callback order
          return;
        }
        const data = body.results.map(user => ({
          text: `${user.name.first} ${user.name.last}`,
          value: user.login.username,
        }));
        this.setState({ data, fetching: false });
      });
  }

  handleChange(value) {
    this.setState({
      value,
      data: [],
      fetching: false,
    });
  }

  render() {
    const { fetching, data, value } = this.state;
    return (
      <PageContentView headerMenuKeys={['qxgl']} sliderMenuKeys={['ywlb']}>
        <h2>权限管理</h2>
        <div>
          <Divider orientation="left"></Divider>
        </div>
        <Card title="系统管理员">
          <Select
            mode="multiple"
            labelInValue
            value={value}
            placeholder="Select users"
            notFoundContent={fetching ? <Spin size="small" /> : null}
            filterOption={false}
            onSearch={this.fetchUser}
            onChange={this.handleChange}
            style={{ width: '50%' }}
          >
            {data.map(d => <Option key={d.value}>{d.text}</Option>)}
          </Select>
          <span className="icon">
            <Icon type="warning" theme="twoTone" />拥有系统超级权限
          </span>
        </Card>
        <div className="demo-container"></div>
      </PageContentView>
    );
  }
}


