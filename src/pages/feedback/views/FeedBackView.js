require('./FeedBackView.scss');
import React from 'react';
import PageContentView from '../../../common/components/PageContentView';
import { Card, Form,  Input, Select, Button, Divider } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log(this.props.form.getFieldsValue());
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
      <PageContentView headerMenuKeys={['fkfw']} sliderMenuKeys={['fkzx']}>
        <h2>反馈中心</h2>
        <div>
          <Divider orientation="left"></Divider>
        </div>
        <Card title="反馈业务信息">
          <Form layout="horizontal" className="form">
            <FormItem label="标题" {...fromItemLayout}>
              {
                getFieldDecorator('title', {
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
                  <Input placeholder="请输入标题" maxLength={21}/>
                )
              }
            </FormItem>
            <FormItem label="备注" {...fromItemLayout}>
              {
                getFieldDecorator('Remarks', {
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
                  <TextArea placeholder="备注信息" maxLength={100} />
                )
              }
            </FormItem>
            <FormItem label="所属项目" {...fromItemLayout}>
              {
                getFieldDecorator('suoshuProject', {
                  initialValue: '请选择所属项目',
                  rules: [
                    {
                      required: true,
                      message: '不能为空',
                    },
                  ],
                })(
                  <Select placeholder="请选择所属项目">
                    <Select.Option value="全部项目">全部项目</Select.Option>
                    <Select.Option value="passport风控">passport风控</Select.Option>
                    <Select.Option value="paopap风控">paopap风控</Select.Option>
                    <Select.Option value="游戏风控">游戏风控</Select.Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="所属业务" {...fromItemLayout}>
              {
                getFieldDecorator('suoshuBz', {
                  initialValue: '请选择所属业务',
                  rules: [
                    {
                      required: true,
                      message: '不能为空',
                    },
                  ],
                })(
                  <Select placeholder="请选择所属业务">
                    <Select.Option value="全部业务">全部业务</Select.Option>
                    <Select.Option value="登录">登录</Select.Option>
                    <Select.Option value="注册">注册</Select.Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="反馈类型" {...fromItemLayout}>
              {
                getFieldDecorator('SelectStyle', {
                  initialValue: '请选择反馈类型',
                  rules: [
                    {
                      required: true,
                      message: '不能为空',
                    },
                  ],
                })(
                  <Select placeholder="请选择反馈类型">
                    <Select.Option value="临时名单">临时名单</Select.Option>
                    <Select.Option value="黑名单">黑名单</Select.Option>
                    <Select.Option value="白名单">白名单</Select.Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="名单类型" {...fromItemLayout}>
              {
                getFieldDecorator('ListType', {
                  initialValue: '请选择名单类型',
                  rules: [
                    {
                      required: true,
                      message: '不能为空',
                    },
                  ],
                })(
                  <Select placeholder="请选择名单类型">
                    <Select.Option value="无风险">无风险</Select.Option>
                    <Select.Option value="低风险">低风险</Select.Option>
                    <Select.Option value="中风险">中风险</Select.Option>
                    <Select.Option value="高风险">高风险</Select.Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="有效时间" {...fromItemLayout}>
              {
                getFieldDecorator('RangeTime', {
                  initialValue: '请选择期限',
                  rules: [
                    {
                      required: true,
                      message: '不能为空',
                    },
                  ],
                })(
                  <Select placeholder="请选择时间">
                    <Select.Option value="1天">1天</Select.Option>
                    <Select.Option value="2天">2天</Select.Option>
                    <Select.Option value="3天">3天</Select.Option>
                    <Select.Option value="4天">4天</Select.Option>
                    <Select.Option value="5天">5天</Select.Option>
                    <Select.Option value="6天">6天</Select.Option>
                    <Select.Option value="7天">7天</Select.Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="名单" {...fromItemLayout}>
              {
                getFieldDecorator('ListName', {
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
                  <Input placeholder="请输入名单" maxLength={21}/>
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
            <div>
              <Divider orientation="left"></Divider>
            </div>
            <Button onClick={this.handleClick} className="sub-btn" type="submit">提交申请</Button>
          </Form>
        </Card>
      </PageContentView>
    );
  }
}

export default Form.create()(Feedback);