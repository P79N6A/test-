require('./WorkList.scss');
import React, { Component } from 'react';
import { Table, Button, Input, Divider } from 'antd';
import PageContentView from '../../../common/components/PageContentView';
import WorkListAction from '../actions/WorkListAction';
import BZColumnMap from '../configs/columnsMap';
import axios from '../../../common/https/http';

// const statusMap = ['default', 'processing', 'success', 'error'];
// const status = ['关闭', '运行中', '已上线', '异常'];


export default class WorkListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      allBZDataSource: [],
      allBZSearchValue: '',
      current: 1,
      pageSize: 10,
    };
    this._searchValue = undefined;
    this.columnsConfig = this.getAllBZColumns();
    this.allBZData = [];
    this.allFilteredData = [];
    this._handleSearchBtnClick = this._handleSearchBtnClick.bind(this);
  }
  componentDidMount() {
    this.getAllBZData();
  }

  componentWillUnmount() {

  }
  getAllBZData() {
    this.setState({
      isLoading: true,
    });
    WorkListAction.getAllBZData()
      .then(res => {
        const allBZData = res.map(data => {
          data.key = data.wlNum;
          return data;
        });
        this.allBZData = allBZData;
        this.allFilteredData = allBZData;
        this.setState({
          isLoading: false,
          allBZDataSource: allBZData,
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
  _handleAllBZColumnClick(data) {
    // TODO: 查看详情
    console.log(data);
  }
  getAllBZColumns() {
    const columns = BZColumnMap.map(data => {
      const { title, key } = data;
      const dataItem = {
        title,
        key,
        dataIndex: key,
      };
      switch (key) {
        case 'action':
          dataItem.render = (text, record) => {
            return (
              <span>
                <a href="javascript:;" onClick={this._handleAllBZColumnClick.bind(this, record)}>查看详情</a>
              </span>
            );
          };
          break;
        case 'applyTime':
          dataItem.render = (text) => {
            return new Date(text).toISOString().slice(0, 19).replace('T', ' ');
          };
          break;
        case 'Update':
          dataItem.render = (text) => {
            return new Date(text).toISOString().slice(0, 19).replace('T', ' ');
          };
          break;
        case 'status': {
          console.log('status');
          console.log(status);
          console.log(key);
          switch (status) {            
            case '关闭':
              console.log('state0');
              dataItem.render = () => {
                return (
                  <span style={{ color: 'pink' }}>
                    正在审批
                  </span>
                );
              };
              break;
            case '1':
              console.log('state1');
              dataItem.render = () => {
                return (
                  <span style={{ color: 'yellow' }}>
                    等待执行
                  </span>
                );
              };
              break;
            case '2':
              console.log(status[2]);
              console.log('state2');
              console.log(key.value);
              console.log(key.text);
              dataItem.render = () => {
                return (
                  <span style={{ color: 'green' }}>
                    执行通过
                  </span>
                );
              };
              break;
            case '3':
              console.log('state3');
              dataItem.render = () => {
                return (
                  <span style={{ color: 'red' }}>
                    审批拒绝
                  </span>
                );
              };
              break;
          }
          // switch (State[1].value) {
          //   case State[1].value:
          //     console.log('state1');
          //     dataItem.render = () => {
          //       return (
          //         <span style={{ color: 'yellow' }}>
          //           等待执行
          //         </span>
          //       );
          //     };
          //     break;
          // }
          // switch (State[2].value) {
          //   case State[2].value:
          //     console.log('state2');
          //     dataItem.render = () => {
          //       return (
          //         <span style={{ color: 'green' }}>
          //           审批通过
          //         </span>
          //       );
          //     };
          //     break;
          // }
          // switch (State[3].value) {
          //   case State[3].value:
          //     console.log('state3');
          //     dataItem.render = () => {
          //       return (
          //         <span style={{ color: 'red' }}>
          //           审批拒绝
          //         </span>
          //       );
          //     };
          //     break;
          // }
          break;
        }
          
      }
      return dataItem;
    });
    return columns;
  }

  // 关键词搜索
  _handleSearchBtnClick() {
    // e && e.stopPropagation();
    // const { onClick } = this.props;
    const value = this._searchValue.input.value;
    console.log(value);
    const current = this.state.current;
    const pageSize = this.state.pageSize;
    console.log(current, pageSize);
    // const a = JSON.stringify(value);
    // console.log(a);

    // axios.post(`URL${this._searchValue.input.value}.json`)
    //   .then(res => {
    //     this.setState({ posts });
    //   });


    // if (onClick) {
    //   onClick(value);
    // }
    this.setState({
      isLoading: true,
    });


    let filterd;
    if (value === '') {
      filterd = this.allFilteredData;
    }
    axios({
      url: '/user',
      method: 'POST',
      data: {
        value: value,
        current: current,
        pageSize: pageSize,
      },
    }).then(res => {
      console.log(res);
    }).catch(e => {
      console.log(e);
    });

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
      myBZSearchValue: value,
      allBZDataSource: filterd,
    });
  }

  handleChange(pagination) {
    console.log('page吗');
    console.log('Various parameters', pagination);
    console.log(pagination.current, pagination.pageSize);
    const current = pagination.current;
    const pageSize = pagination.pageSize;
    console.log(current, pageSize);

    // this.setState({
    //   isLoading: true,
    // });
  }
  render() {
    const { allBZDataSource, isLoading } = this.state;
    return (
      <PageContentView headerMenuKeys={['gdlb']} sliderMenuKeys={['ywlb']}>
        <h2>工单列表</h2>
        <div>
          <Divider orientation="left"></Divider>
        </div>
        <div className="search">
          <label className="search-label">关键字</label>
          <Input
            className="search-key"
            allowClear 
            ref={_ => this._searchValue = _}
          />
          {/* <Search
            placeholder=""
            className="search-key"
            //打印出搜索框的值以便后台搜索
            onSearch={value => console.log(value)}
          /> */}
          <Button className="search-btn" onClick={this._handleSearchBtnClick}>查询</Button>
        </div>
        <Table
          bordered
          columns={this.columnsConfig}
          dataSource={allBZDataSource}
          loading={isLoading}
          onChange={this.handleChange}
          pagination={{
            pageSizeOptions: ['5', '10', '20'],
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
        />
      </PageContentView>
    );
  }
}