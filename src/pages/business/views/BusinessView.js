require('./BusinessView.scss');
import React, { Component } from 'react';
import { Tabs, Button, Divider, Table, Alert, notification as Notification } from 'antd';

import PageContentView from '../../../common/components/PageContentView';
import ProjectSelectorView from './ProjectSelectorView';
import ApplyJoinBZView from './ApplyJoinBZView';

import BusinessAction from '../actions/BusinessAction';
import SliderConfig from '../../../configs/sliderConfig';
import BZColumnMap from '../configs/columnsMap';
import utils from '../../../common/utils';

const TabPane = Tabs.TabPane;

export default class BusinessView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currTabKey: 'MYBZ',
      isLoading: false,
      myBZDataSource: [],
      myBZGroups: [],
      mySelectedBZGroup: 'all',
      myBZSearchValue: '',

      allBZDataSource: [],
      allBZGroups: [],
      allSelectedBZGroup: 'all',
      allBZSearchValue: '',
    };
    this.myColumnsConfig = this.getMyBZColumns();
    this.allColumnsConfig = this.getAllBZColumns();
    this.myBZData = [];
    this.myFilteredData = [];
    this.allBZData = [];
    this.allFilteredData = [];

    this._applyJoinBZView = undefined;

    this._handleTabClick = this._handleTabClick.bind(this);
    this._handleTabAllBZGroup = this._handleTabAllBZGroup.bind(this);
    this._handleMyBZSelectorChange = this._handleMyBZSelectorChange.bind(this);
    this._handleMyBZSearchBtnClick = this._handleMyBZSearchBtnClick.bind(this);
    this._handleAllBZSelectorChange = this._handleAllBZSelectorChange.bind(this);
    this._handleAllBZSearchBtnClick = this._handleAllBZSearchBtnClick.bind(this);
    this._handleApplyBZBtnClick = this._handleApplyBZBtnClick.bind(this);
    this._handleFeedBackBtnClick = this._handleFeedBackBtnClick.bind(this);
    this._handleApplyJoinBZConfirm = this._handleApplyJoinBZConfirm.bind(this);
  }

  componentDidMount() {
    this.getBZData();
  }

  componentWillUnmount() {

  }

  getBZData() {
    this.setState({
      isLoading: true,
    });
    BusinessAction.getMyBZData()
      .then(res => {
        const myBZData = res.map(data => {
          data.key = data.bzNum;
          return data;
        });
        const myBZGroups = [{ label: '所有业务组', value: 'all' }];
        const groups = {};
        myBZData.forEach((item) => {
          groups[item.bzGroup] = 1;
        });
        for (let k in groups) {
          myBZGroups.push({
            label: k,
            value: k,
          });
        }
        this.myBZData = myBZData;
        this.myFilteredData = myBZData;
        this.setState({
          isLoading: false,
          myBZDataSource: myBZData,
          mySelectedBZGroup: 'all',
          myBZGroups,
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isLoading: false,
        });
      });
  }

  getAllBZData() {
    this.setState({
      isLoading: true,
    });
    BusinessAction.getAllBZData()
      .then(res => {
        const allBZData = res.map(data => {
          data.key = data.bzNum;
          return data;
        });
        const allBZGroups = [{ label: '所有业务组', value: 'all' }];
        const groups = {};
        allBZData.forEach((item) => {
          groups[item.bzGroup] = 1;
        });
        for (let k in groups) {
          allBZGroups.push({
            label: k,
            value: k,
          });
        }
        this.allBZData = allBZData;
        this.allFilteredData = allBZData;
        this.setState({
          isLoading: false,
          allBZDataSource: allBZData,
          allSelectedBZGroup: 'all',
          allBZGroups,
        });
      })
      .catch(err => {
        // TODO: 错误处理
        console.log(err);
        this.setState({
          isLoading: false,
        });
      });
  }

  _handleMyBZColumnClick(data) {
    // TODO: 打开管理页面
    console.log(data);
    location.href = `./bzmanage.html?bzId=${data.bzNum}`;
  }

  _handleTabAllBZGroup() {
    this.setState({
      currTabKey: 'ALLBZ',
    });
    this.getAllBZData();
  }

  _handleAllBZColumnClick(data) {
    // TODO: 申请加入业务组
    this._applyJoinBZView.open(data);
  }

  _handleApplyBZBtnClick(e) {
    e && e.stopPropagation(e);
    // TODO: 业务申请页面
  }

  _handleFeedBackBtnClick(e) {
    e && e.stopPropagation();
    // TODO: 快速反馈页面
  }

  _handleApplyJoinBZConfirm(value) {
    console.log(value);
    // TODO: send data to server
    const sendDataToServer = () => {
      return new Promise((resolve, reject) => {
        if (Math.random() * 10 > 5) {
          resolve('12345');
        } else {
          reject('mock error');
        }
      });
    };
    const notifKey = 'apply_join_BZ_notif_key';

    sendDataToServer()
      .then(res => {
        Notification.close(notifKey);
        Notification.success({
          key: notifKey,
          duration: 0,
          message: <div>提交成功，工单编号为<span style={{ marginLeft: 10, color: '#1890ff' }}>{res}</span></div>,
        });
        this._applyJoinBZView.close();
      })
      .catch(err => {
        console.log(err);
        Notification.close(notifKey);
        Notification.error({
          key: notifKey,
          duration: 0,
          message: <div>服务器异常，请稍候重试</div>,
        });
      });
  }

  _handleTabClick(key) {
    this.setState({
      currTabKey: key,
    });
    switch (key) {
      case 'ALLBZ':
        this.getAllBZData();
        break;
      case 'MYBZ':
      default:
        this.getBZData();
    }
  }

  _handleMyBZSelectorChange(value) {
    //本地过滤业务组
    let filterd;
    if (value === 'all') {
      filterd = this.myBZData;
    } else {
      filterd = this.myBZData.filter(item => item.bzGroup === value);
    }

    this.myFilteredData = filterd;
    this.setState({
      mySelectedBZGroup: value,
      myBZDataSource: filterd,
    });
  }

  _handleMyBZSearchBtnClick(value) {
    this.setState({
      isLoading: true,
    });
    let filterd;
    if (value === '') {
      filterd = this.myFilteredData;
    }
    filterd = this.myFilteredData.filter(item => {
      for (let k in item) {
        if (k === 'applyTime') {
          continue;
        }
        if (item[k].toString().indexOf(value) > -1) {
          return true;
        }
      }
    });

    this.setState({
      isLoading: false,
      myBZSearchValue: value,
      myBZDataSource: filterd,
    });
  }

  _handleAllBZSelectorChange(value) {
    //本地过滤业务组
    let filterd;
    if (value === 'all') {
      filterd = this.allBZData;
    } else {
      filterd = this.allBZData.filter(item => item.bzGroup === value);
    }

    this.allFilteredData = filterd;
    this.setState({
      allSelectedBZGroup: value,
      allBZDataSource: filterd,
    });
  }

  _handleAllBZSearchBtnClick(value) {
    this.setState({
      isLoading: true,
    });
    let filterd;
    if (value === '') {
      filterd = this.allFilteredData;
    }
    filterd = this.allFilteredData.filter(item => {
      for (let k in item) {
        if (k === 'applyTime') {
          continue;
        }
        if (item[k].toString().indexOf(value) > -1) {
          return true;
        }
      }
    });

    this.setState({
      isLoading: false,
      allBZSearchValue: value,
      allBZDataSource: filterd,
    });
  }

  getMyBZColumns() {
    const columns = BZColumnMap.map(data => {
      const { title, key, sorter } = data;
      const dataItem = {
        title,
        key,
        dataIndex: key,
      };

      if (sorter) {
        dataItem.sorter = (a, b) => {
          return typeof a[key] === 'number' ? a[key] - b[key] : (typeof a[key] === 'string' ? a[key].localeCompare(b[key]) : a[key].toString().localeCompare(b[key].toString()));
        };
      }

      switch (key) {
        case 'action':
          dataItem.render = (text, record) => {
            return (
              <span>
                <a href="javascript:;" onClick={this._handleMyBZColumnClick.bind(this, record)}>查看业务</a>
              </span>
            );
          };
          break;
        case 'applyTime':
          dataItem.render = (text) => {
            return utils.formattedDate(text);
          };
          break;
      }
      return dataItem;
    });
    return columns;
  }

  getAllBZColumns() {
    const columns = BZColumnMap.map(data => {
      const { title, key, sorter } = data;
      const dataItem = {
        title,
        key,
        dataIndex: key,
      };

      if (sorter) {
        dataItem.sorter = (a, b) => {
          return typeof a[key] === 'number' ? a[key] - b[key] : (typeof a[key] === 'string' ? a[key].localeCompare(b[key]) : a[key].toString().localeCompare(b[key].toString()));
        };
      }

      switch (key) {
        case 'action':
          dataItem.render = (text, record) => {
            return (
              <span>
                <a href="javascript:;" onClick={this._handleAllBZColumnClick.bind(this, record)}>申请加入</a>
              </span>
            );
          };
          break;
        case 'applyTime':
          dataItem.render = (text) => {
            return new Date(text).toISOString().slice(0, 19).replace('T', ' ');
          };
          break;
      }
      return dataItem;
    });
    return columns;
  }

  render() {
    const { currTabKey = 'MYBZ', myBZDataSource = [], allBZDataSource = [], isLoading, myBZGroups, allBZGroups, mySelectedBZGroup, allSelectedBZGroup } = this.state;
    const hasBZData = myBZDataSource.length > 0;
    return (
      <PageContentView headerMenuKeys={['ywlb']} sliderMenuKeys={['ywlb']} sliderConfig={SliderConfig.bz}>
        <div className="page-title">
          <h2>业务列表</h2>
        </div>
        <div>
          <Divider orientation="left"></Divider>
        </div>
        <div className="buss-opts-container">
          <Button type="primary" icon="plus" onClick={this._handleApplyBZBtnClick}>申请业务</Button>
          <Button type="primary" icon="plus" onClick={this._handleFeedBackBtnClick}>快速反馈</Button>
        </div>
        <div className="buss-tab-container">
          <Tabs defaultActiveKey={currTabKey} activeKey={currTabKey} onTabClick={this._handleTabClick}>
            <TabPane tab="我的业务" key="MYBZ">
              {
                hasBZData || isLoading ? undefined : (
                  <div className="empty-tips-container">
                    <Alert message={<span>您当前不在任何业务组中，请先 <a href="javascript:;" onClick={this._handleTabAllBZGroup}>加入业务组</a></span>} type="error"  style={{ textAlign: 'center' }}/>
                  </div>
                )
              }
              {
                hasBZData ? (
                  <div className="bz-table-options-container">
                    <ProjectSelectorView
                      dataSource={myBZGroups}
                      selectedKey={mySelectedBZGroup}
                      onSelectorChange={this._handleMyBZSelectorChange}
                      onSearchBtnClick={this._handleMyBZSearchBtnClick}
                    />
                  </div>
                ) : undefined
              }
              {
                hasBZData ? (
                  <Table
                    bordered
                    columns={this.myColumnsConfig}
                    dataSource={myBZDataSource}
                    loading={isLoading}
                    pagination={{
                      pageSizeOptions: ['5', '10', '20'],
                      showSizeChanger: true,
                      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    }}
                  />
                ) : undefined
              }
            </TabPane>
            <TabPane tab="全部业务" key="ALLBZ">
              <div className="bz-table-options-container">
                <ProjectSelectorView
                  dataSource={allBZGroups}
                  selectedKey={allSelectedBZGroup}
                  onSelectorChange={this._handleAllBZSelectorChange}
                  onSearchBtnClick={this._handleAllBZSearchBtnClick}
                />
              </div>
              <Table
                bordered
                columns={this.allColumnsConfig}
                dataSource={allBZDataSource}
                loading={isLoading}
                pagination={{
                  pageSizeOptions: ['5', '10', '20'],
                  showSizeChanger: true,
                  showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                }}
              />
            </TabPane>
          </Tabs>
        </div>
        <ApplyJoinBZView
          ref={_ => this._applyJoinBZView = _}
          onConfirm={this._handleApplyJoinBZConfirm}
        />
      </PageContentView>
    );
  }
}
