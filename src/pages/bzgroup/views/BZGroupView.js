require('./BZGroupView.scss');
import React, { Component } from 'react';
import { Tabs, Divider, Table, Alert, notification as Notification } from 'antd';

import PageContentView from '../../../common/components/PageContentView';
import SearchInputView from '../../../common/components/SearchInputView';
import ApplyJoinBZGView from './ApplyJoinBZGView';

import BZGroupAction from '../actions/BZGroupAction';
import BZGColumnMap from '../configs/columnsMap';
import SliderConfig from '../../../configs/sliderConfig';
import utils from '../../../common/utils';

const TabPane = Tabs.TabPane;

export default class BusinessView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currTabKey: 'MYBZG',
      isLoading: false,
      hasBZGData: false,
      myBZGDataSource: [],
      allBZGDataSource: [],
    };
    this.myBZGData = [];
    this.myFilteredData = [];

    this.allBZGData = [];
    this.allFilteredData = [];

    this.myColumnsConfig = this.getMyBZGColumns();
    this.allColumnsConfig = this.getAllBZGColumns();

    this._applyJoinBZGView = undefined;

    this._handleTabClick = this._handleTabClick.bind(this);
    this._handleTabAllBZGroup = this._handleTabAllBZGroup.bind(this);
    this._handleMyBZGSearchBtnClick = this._handleMyBZGSearchBtnClick.bind(this);
    this._handleAllBZGSearchBtnClick = this._handleAllBZGSearchBtnClick.bind(this);
    this._handleApplyJoinBZGConfirm = this._handleApplyJoinBZGConfirm.bind(this);
  }

  componentDidMount() {
    this.getBZGData();
  }

  componentWillUnmount() {

  }



  getBZGData() {
    this.setState({
      isLoading: true,
    });
    BZGroupAction.getMyBZGList()
      .then(res => {
        const myBZGData = res.map(data => {
          data.key = data.groupId;
          return data;
        });

        this.myBZGData = myBZGData;
        this.myFilteredData = myBZGData;
        this.setState({
          isLoading: false,
          myBZGDataSource: myBZGData,
          hasBZGData: myBZGData.length > 0,
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isLoading: false,
        });
      });
  }

  getAllBZGData() {
    this.setState({
      isLoading: true,
    });
    BZGroupAction.getAllBZGList()
      .then(res => {
        const allBZGData = res.map(data => {
          data.key = data.groupId;
          return data;
        });

        this.allBZGData = allBZGData;
        this.allFilteredData = allBZGData;
        this.setState({
          isLoading: false,
          allBZGDataSource: allBZGData,
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

  getMyBZGColumns() {
    const columns = BZGColumnMap.map(data => {
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
                <a href="javascript:;" onClick={this._handleMyBZGColumnClick.bind(this, record)}>查看详情</a>
              </span>
            );
          };
          break;
        case 'createTime':
        case 'updateTime':
          dataItem.render = (text) => {
            return utils.formattedDate(text);
          };
          break;
      }
      return dataItem;
    });
    return columns;
  }

  getAllBZGColumns() {
    const columns = BZGColumnMap.map(data => {
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
        case 'createTime':
        case 'updateTime':
          dataItem.render = (text) => {
            return utils.formattedDate(text);
          };
          break;
      }
      return dataItem;
    });
    return columns;
  }

  _handleMyBZGColumnClick(item) {
    console.log(item);
    location.href = `./bzgmanage.html?bzgId=${item.groupId}`;
  }

  _handleAllBZColumnClick(item) {
    this._applyJoinBZGView.open(item);
  }

  _handleTabAllBZGroup() {
    this.setState({
      currTabKey: 'ALLBZG',
    });
    this.getAllBZGData();
  }

  _handleTabClick(key) {
    this.setState({
      currTabKey: key,
    });
    switch (key) {
      case 'ALLBZG':
        this.getAllBZGData();
        break;
      case 'MYBZG':
      default:
        this.getBZGData();
    }
  }

  _handleMyBZGSearchBtnClick(value) {
    this.setState({
      isLoading: true,
    });
    let filterd;
    if (value === '') {
      filterd = this.myFilteredData;
    }
    filterd = this.myFilteredData.filter(item => {
      for (let k in item) {
        if (BZGColumnMap.filter(g => g.key === k).length === 0) {
          continue;
        }
        if (k === 'createTime' || k === 'updateTime') {
          continue;
        }
        if (item[k].toString().indexOf(value) > -1) {
          return true;
        }
      }
    });

    this.setState({
      isLoading: false,
      myBZGDataSource: filterd,
    });
  }

  _handleAllBZGSearchBtnClick(value) {
    this.setState({
      isLoading: true,
    });
    let filterd;
    if (value === '') {
      filterd = this.allFilteredData;
    }
    filterd = this.allFilteredData.filter(item => {
      for (let k in item) {
        if (BZGColumnMap.filter(g => g.key === k).length === 0) {
          continue;
        }
        if (k === 'createTime' || k === 'updateTime') {
          continue;
        }
        if (item[k].toString().indexOf(value) > -1) {
          return true;
        }
      }
    });

    this.setState({
      isLoading: false,
      allBZGDataSource: filterd,
    });
  }

  _handleApplyJoinBZGConfirm(value) {
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
    const notifKey = 'apply_join_BZG_notif_key';

    sendDataToServer()
      .then(res => {
        Notification.close(notifKey);
        Notification.success({
          key: notifKey,
          duration: 0,
          message: <div>提交成功，工单编号为<span style={{ marginLeft: 10, color: '#1890ff' }}>{res}</span></div>,
        });
        this._applyJoinBZGView.close();
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

  render() {
    const { isLoading, currTabKey, myBZGDataSource, allBZGDataSource, hasBZGData } = this.state;

    return (
      <PageContentView headerMenuKeys={['ywzlb']} sliderMenuKeys={['ywzlb']} sliderConfig={SliderConfig.bzGroup}>
        <div className="page-title">
          <h2>业务组列表</h2>
        </div>
        <div>
          <Divider orientation="left"></Divider>
        </div>
        <div className="bzg-tab-container">
          <Tabs defaultActiveKey={currTabKey} activeKey={currTabKey} onTabClick={this._handleTabClick}>
            <TabPane tab="我的业务组" key="MYBZG">
              {
                hasBZGData || isLoading ? undefined : (
                  <div className="empty-tips-container">
                    <Alert message={<span>您当前不在任何业务组中，请先 <a href="javascript:;" onClick={this._handleTabAllBZGroup}>加入业务组</a></span>} type="error"  style={{ textAlign: 'center' }}/>
                  </div>
                )
              }
              {
                hasBZGData ? (
                  <div className="bz-table-options-container">
                    <SearchInputView
                      style={{ margin: '20px 0' }}
                      onSearchBtnClick={this._handleMyBZGSearchBtnClick}
                    />
                  </div>
                ) : undefined
              }
              {
                hasBZGData ? (
                  <Table
                    bordered
                    columns={this.myColumnsConfig}
                    dataSource={myBZGDataSource}
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
            <TabPane tab="加入业务组" key="ALLBZG">
              <div className="bz-table-options-container">
                <SearchInputView
                  style={{ margin: '20px 0' }}
                  onSearchBtnClick={this._handleAllBZGSearchBtnClick}
                />
              </div>
              <Table
                bordered
                columns={this.allColumnsConfig}
                dataSource={allBZGDataSource}
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
        <ApplyJoinBZGView
          ref={_ => this._applyJoinBZGView = _}
          onConfirm={this._handleApplyJoinBZGConfirm}
        />
      </PageContentView>
    );
  }
}
