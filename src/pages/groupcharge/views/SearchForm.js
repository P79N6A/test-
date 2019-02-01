import React from 'react';
import moment from 'moment';
import { Row, Col, Form, Input, Select, Button, DatePicker } from 'antd';
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const Option = Select.Option;
function onChangeTime(dates, dateStrings) {
  console.log('From: ', dates[0], ', to: ', dates[1]);
  console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
}

function handleSelectChange(value) {
  console.log(`selected ${value}`);
}

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formvalue: {
        // userVal: '',
        // selectVal: '',
        // czstVal: '',
        // date0: '',
        // date1: '',
      },
      pageVal: {
        current: 1,
        pageSize: 10,
      },
    };
    this.handleSearch = this.handleSearch.bind(this);
    // this.getItemsValue = this.getItemsValue.bind(this);
    this.handleFormReset = this.handleFormReset.bind(this);
  }

  // getItemsValue () {    //3、自定义方法，用来传递数据（需要在父组件中调用获取数据）
  //   const formvalue = this.props.form.getFieldsValue();       //4、getFieldsValue：获取一组输入控件的值，如不传入参数，则获取全部组件的值
  //   console.log(formvalue);
  //   return formvalue;
  // }
  handleFormReset() {
    const { form } = this.props;
    const formvalue = this.props.form.getFieldsValue();       //4、getFieldsValue：获取一组输入控件的值，如不传入参数，则获取全部组件的值
    console.log(formvalue);
    form.resetFields();
    this.setState({
      formValue: {},
    });
  }
  handleSearch() {
    // e.preventDefault();
    const formvalue = this.props.form.getFieldsValue();       //4、getFieldsValue：获取一组输入控件的值，如不传入参数，则获取全部组件的值
    console.log(formvalue);
    return formvalue;
    
    // const { form } = this.props;

    // form.validateFields((err, fieldsValue) => {
    //   if (err) {
    //     return;
    //   }

    //   const values = {
    //     ...fieldsValue,
    //   };

    //   this.setState({
    //     formValues: values,
    //   });
    // });
  }

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    
    return (
      <Form onSubmit={this.handleSearch}  ref={this.getItemsValue}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} type="flex" justify="space-around" >
          <Col  xl={4} lg={4} md={8} sm={24}>
            <FormItem label="">
              {getFieldDecorator('username', { initialValue: '' })(<Input placeholder="请输入用户名" />)}
            </FormItem>
          </Col>
          <Col xl={4} lg={4} md={8} sm={24}>
            <FormItem label="">
              {getFieldDecorator('czlx', { initialValue: '查询操作类型' })(
                <Select  className="search-czlx " onChange={handleSelectChange} style={{ width: 150 }}>
                  <Option value="SELECT">SELECT</Option>
                  <Option value="UPDATE">UPDATE</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col xl={4} lg={4} md={8} sm={24}>
            <FormItem label="">
              {getFieldDecorator('czst', { initialValue: '' })(<Input placeholder="请输查询操作实体" />)}
            </FormItem>
          </Col>
          <Col xl={8} lg={8} md={6} sm={24}>
            <FormItem label="">
              {getFieldDecorator('time', { initialValue: '' })(
                <RangePicker
                  className="search-time"
                  ranges={{ Today: [moment(), moment()], 'This Month': [moment().startOf('month'), moment().endOf('month')] }}
                  showTime
                  format="YYYY/MM/DD HH:mm:ss"
                  onChange={onChangeTime}
                />
              )}
            </FormItem>
          </Col>
          <Col xl={4} lg={8} md={6} sm={24}>
            <span className="">
              {/* <Button type="primary" htmlType="submit"> */}
              <Button type="primary" onClick={this.handleSearch}>
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }
}
export default Form.create()(SearchForm);