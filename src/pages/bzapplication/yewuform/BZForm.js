import React from 'react';
import { Card, Form,  Input, Select, InputNumber } from 'antd';
import { Checkbox, Row, Col } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
function onChangeCheck(checkedValues) {
  console.log('checked = ', checkedValues);
}
function onChange(value) {
  console.log('changed', value);
}

class FormRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.getItemsValue = this.getItemsValue.bind(this);
  }
  getItemsValue () {    //3、自定义方法，用来传递数据（需要在父组件中调用获取数据）
    const formvalue = this.props.form.getFieldsValue();       //4、getFieldsValue：获取一组输入控件的值，如不传入参数，则获取全部组件的值
    return formvalue;
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const fromItemLayout = {
      labelCol: {
        xs: 24,
        sm: 4,
      },
      wrapperCol: {
        xs: 24,
        sm: 16,
      },
    };
    return (
      <div>
        <Card title="申请业务信息">
          <Form layout="horizontal">
            <FormItem label="业务组名称" {...fromItemLayout}>
              {
                getFieldDecorator('GroupName', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '不能为空',
                    },
                    {
                      max: 20,
                      message: '不超过20字符',
                    },
                  ],
                })(
                  <Input placeholder="请输入名称" maxLength={21}/>
                )
              }
            </FormItem>
            <FormItem label="英文简称" {...fromItemLayout}>
              {
                getFieldDecorator('englishname', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '不能为空',
                    },
                    {
                      max: 20,
                      message: '不超过20字符',
                    },
                    {
                      pattern: /^[\w]+$/,
                      message: '请输入下划线和字母',
                    },
                  ],
                })(
                  <Input placeholder="请输英文简称" maxLength={21}/>
                )
              }
            </FormItem>
            <FormItem label="业务组描述" {...fromItemLayout}>
              {
                getFieldDecorator('text', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '不能为空',
                    },
                    {
                      max: 100,
                      message: '不超过100字符',
                      maxrows: 3 - 6,
                    },
                  ],
                })(
                  <TextArea placeholder="请输入描述" maxLength={100} />
                )
              }
            </FormItem>
            <FormItem label="所属业务组" {...fromItemLayout}>
              {
                getFieldDecorator('suoshuBz', {
                  initialValue: '请选择所属业务组',
                  rules: [
                    {
                      required: true,
                      message: '不能为空',
                    },
                  ],
                })(
                  <Select placeholder="请选择所属业务组">
                    <Select.Option value="passport风控">passport风控</Select.Option>
                    <Select.Option value="paopap风控">paopap风控</Select.Option>
                    <Select.Option value="游戏风控">游戏风控</Select.Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="场景选择" {...fromItemLayout}>
              {
                getFieldDecorator('SelectScene', {
                  initialValue: '请选择场景',
                  rules: [
                    {
                      required: true,
                      message: '不能为空',
                    },
                  ],
                })(
                  <Select placeholder="请选择场景">
                    <Select.Option value="登录防护">登录防护</Select.Option>
                    <Select.Option value="金融防护">金融防护</Select.Option>
                    <Select.Option value="反垃圾防护">反垃圾防护</Select.Option>
                    <Select.Option value="投票防护">投票防护</Select.Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="模式选择" {...fromItemLayout}>
              {
                getFieldDecorator('SelectPattern', {
                  initialValue: '请选择模式',
                  rules: [
                    {
                      required: true,
                      message: '不能为空',
                    },
                  ],
                })(
                  <Select placeholder="请选择模式">
                    <Select.Option value="全托管">全托管</Select.Option>
                    {/* <Option value="半托管">paopap风控</Option>
                    <Option value="自维护">游戏风控</Option> */}
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="最大QPS" {...fromItemLayout}>
              {
                getFieldDecorator('BigQPS', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '不能为空',
                    },
                  ],
                })(
                  <InputNumber step={0.1} onChange={onChange} />
                )
              }
            </FormItem>
            <FormItem label="平均QPS" {...fromItemLayout}>
              {
                getFieldDecorator('AverageQPS', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '不能为空',
                    },
                  ],
                })(
                  <InputNumber step={0.1} onChange={onChange} />
                )
              }
            </FormItem>
            <FormItem label="多机房部署" {...fromItemLayout}>
              {
                getFieldDecorator('deploy', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '不能为空',
                    },
                  ],
                })(
                  <Checkbox.Group style={{ width: '100%' }} onChange={onChangeCheck}>
                    <Row>
                      <Col span={3}><Checkbox value="1">百度</Checkbox></Col>
                      <Col span={3}><Checkbox value="2">中经云</Checkbox></Col>
                      <Col span={3}><Checkbox value="3">北京</Checkbox></Col>
                      <Col span={3}><Checkbox value="4">上海</Checkbox></Col>
                      <Col span={3}><Checkbox value="5">济阳</Checkbox></Col>
                      <Col span={3}><Checkbox value="6">武汉</Checkbox></Col>
                    </Row>
                  </Checkbox.Group>
                )
              }
            </FormItem>
            <FormItem label="邮件抄送" {...fromItemLayout}>
              {
                getFieldDecorator('MailCopy', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '不能为空',
                    },
                  ],
                })(
                  //需要进行邮件匹配吗
                  <Input placeholder="请输入邮件"/>
                )
              }
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create()(FormRegister);