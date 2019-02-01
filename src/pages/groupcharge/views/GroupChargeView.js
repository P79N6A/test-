require('./GroupCharge.scss');
import React, { Component } from 'react';
import PageContentView from '../../../common/components/PageContentView';
import GroupAction from '../actions/GroupAction';
import BZColumnMap from '../configs/columnsMap';
import SearchForm from './SearchForm';
import { Table,  Divider } from 'antd';
// import moment from 'moment';
// const Search = Input.Search;
// const Option = Select.Option;
// import axios from 'axios'; 


//获取时间以便给后台数据查询
// const RangePicker = DatePicker.RangePicker;
// function onChange(dates, dateStrings) {
//   console.log('From: ', dates[0], ', to: ', dates[1]);
//   console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
// }

// function handleSelectChange(value) {
//   console.log(`selected ${value}`);
// }
export default class GroupCharge extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      allBZDataSource: [],
    };
    this.columnsConfig = this.getAllBZColumns();
    this.allBZData = [];
    this.handleChange = this.handleChange.bind(this);
  }
  //动态获取mock数据
  // request() {
  //   let baseUrl = 'https://www.easy-mock.com/mock/5c413de6cee47f2c67974e95/table.api';
  //   axios.get(baseUrl + '/tabel/list').then((res) => {
  //     console.log('1');
  //     console.log(JSON.stringify(res));
  //     if (res.status === '200') {
  //       res.result.list.map((item,index) => {
  //       item.key = expandIconColumnIndex;
  //      })
  //       this.setState({
  //         dataSource2: res.data.list,
  //         selectedRowkeys: [],
  //         selectedRow: null,
  //         pagination: pagination(res,(current) => {
  //         // to do
  //         }),
  //       });
  //     }
  //   });
  // }
  componentDidMount() {
    this.getAllBZData();
  }

  componentWillUnmount() {

  }
  getAllBZData() {
    this.setState({
      isLoading: true,
    });
    // let baseUrl = 'http://magellan-doc.online.qiyi.qae';
    // axios.get(baseUrl + '/api/opt/log/audit_list').then((res) => {
    //   console.log('1');
    //   console.log(JSON.stringify(res));
    //   if (res.status === '200') {
    //     res.result.list.map((item,index) => {
    //     item.key = expandIconColumnIndex;
    //   })
    //     this.setState({
    //       dataSource2: res.data.list,
    //       selectedRowkeys: [],
    //       selectedRow: null,
    //       pagination: pagination(res,(current) => {
    //       // to do
    //       }),
    //     });
    //   }
    // });
    GroupAction.getAllBZData()
      .then(res => {
        const allBZData = res.map(data => {
          data.key = data.wlNum;
          return data;
        });
        this.allBZData = allBZData;
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
  getAllBZColumns() {
    const columns = BZColumnMap.map(data => {
      const { title, key } = data;
      const dataItem = {
        title,
        key,
        dataIndex: key,
      };
      switch (key) {
        case 'time':
          dataItem.render = (text) => {
            return new Date(text).toISOString().slice(0, 19).replace('T', ' ');
          };
          break;
      }
      return dataItem;
    });
    return columns;
  }
  handleChange(pagination, filters) {
    console.log('page吗');
    console.log('Various parameters', pagination, filters);
    console.log(this.formRef.handleSearch());
    
  }

  render() {
    const { allBZDataSource, isLoading } = this.state;
    return (
      <PageContentView headerMenuKeys={['sjrz']} sliderMenuKeys={['ywlb']}>
        <h2>审计日志</h2>
        <div>
          <Divider orientation="left"></Divider>
        </div>
        {/* <div className="table-search-container">
          <Input
            placeholder="用户名搜索"
            className="search-user"
            //打印出搜索框的值以便后台搜索
            onChange={value => console.log(value)}
            style={{ width: 200 }}
          />
          <Select defaultValue="查询操作类型" className="search-czlx " onChange={handleSelectChange}>
            <Option value="SELECT">SELECT</Option>
            <Option value="UPDATE">UPDATE</Option>
          </Select>
          <Search
            placeholder="查询操作实体"
            className="search-czst"
            //打印出搜索框的值以便后台搜索
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
          />
          <RangePicker
            className="search-time"
            ranges={{ Today: [moment(), moment()], 'This Month': [moment().startOf('month'), moment().endOf('month')] }}
            showTime
            format="YYYY/MM/DD HH:mm:ss"
            onChange={onChange}
          />
          <Button className="button">search</Button>
          <Button className="button">clear</Button>
        </div> */}
        <SearchForm wrappedComponentRef={(form) => this.formRef = form} />
        <Table
          className="table"
          bordered
          // rowKey="id"
          rowKey={(r, i) => (i)}
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
        <div className="demo-container"></div>
      </PageContentView>
    );
  }
}
