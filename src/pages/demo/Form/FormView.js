import React from 'react';
import { Card, Form,  Input } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
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
    return (
      <div>
        <Card title="业务组信息">
          <Form layout="horizontal" wrappedComponentRef={this.getItemsValue}>
            <FormItem label="业务组名称">
              {
                getFieldDecorator('userName', {
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
            <FormItem label="英文简称">
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
            <FormItem label="业务组描述">
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
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create()(FormRegister);