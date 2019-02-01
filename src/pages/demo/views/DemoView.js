require('./DemoView.scss');
import React, { Component } from 'react';
import PageContentView from '../../../common/components/PageContentView';
import EditableTable from '../table/EditableCellView';
import FormRegister from '../Form/FormView';
import { Button, Divider } from 'antd';
import { Steps, message } from 'antd';

// const { TextArea } = Input;

const Step = Steps.Step;

const steps = [
  {
    title: '业务组信息',
    content: <FormRegister wrappedComponentRef={(form) => this.formRef = form} />,
  },
  {
    title: '成员信息',
    content: <EditableTable />,
  },
  {
    title: '提交',
    content: 'Last-content',
  },
];

export default class BusinessView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      value: '',
    };
    this.handleSub = this.handleSub.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }
  next() {
    const current = this.state.current + 1;
    this.setState({
      current,
      value: this.formRef.getItemsValue(),
    });
    console.log('1');
    console.log(this.state);
    console.log(this.formRef.getItemsValue());
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
    
  }
  handleSub() {
    console.log('提交');
    //获取表单和表格的数据
    console.log(this.formRef.getItemsValue());
    // this.props.getFormRef(this.formRef.getItemsValue());
    // console.log(FormRegister.getFieldsValue());

  }
  onKeyUp(value) {
    value = value.replace(/[^\d]/g, '');
    console.log(value);
  }
  onBlur(value) {
    value = value.replace(/[^\d]/g, '');
    console.log(value);
  }



  // //前端模糊搜索尝试实现
  // onSearch(searchContent, col) {
  //   setTimeout (function () {//因为是即时查询，需要用setTimeout进行延迟，让值写入到input内，再读取
  //     const storeId = document.getElementById('table1');//获取table的id标识
  //     const rowsLength = storeId.rows.length;//表格总共有多少行  

  //     const searchCol = col;//要搜索的哪一列，这里是第一列，从0开始数起  

  //     for (let i = 1; i < rowsLength; i++) {//按表的行数进行循环，i=1，从第二行开始筛选（从0数起）  

  //       const searchText = storeId.rows[i].cells[searchCol].innerHTML;//取得table行，列的值
  //       //alert(searchText);
  //       if (searchText.match(searchContent) || searchText.toUpperCase().match(searchContent.toUpperCase())) {//用match函数进行筛选，如果input的值，即变量 key的值为空，返回的是ture，
  //         storeId.rows[i].style.display = '';//显示行操作，
  //       } else {
  //         storeId.rows[i].style.display = 'none';//隐藏行操作
  //       }
  //     }
  //   }, 20);//20为延时时间
  // }


  render() {
    const { current } = this.state;
    return (
      <PageContentView headerMenuKeys={['sqywz']} sliderMenuKeys={['ywsq']}>
        <h2>申请业务组</h2>
        <div>
          <Divider orientation="left"></Divider>
        </div>
        {/* <Layout>
          <Layout>
            <Content>
              {/* <FormRegister  wrappedComponentRef={(form) => this.formRef = form} /> */}
        {/* </Content> */}
        {/* </Layout> */}
        {/* <Card title="成员信息">
            <EditableTable />
            <Button  className="foot-btn" type="danger" onClick={this.handleSub}>提交</Button>
          </Card> */}
        {/* </Layout> */} 

        <div className="step">
          <Steps current={current}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
          <div className="steps-action">
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => this.next()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => message.success('Processing complete!')}
              >
                Done
              </Button>
            )}
            {current > 0 && (
              <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                Previous
              </Button>
            )}
          </div>
        </div>
        <div className="demo-container"></div>
      </PageContentView>
    );
  }
}
