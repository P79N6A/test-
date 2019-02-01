require('./EditableCellView.scss');
import UserSelect from './Select';
import EditableCell from './Editable';
import React, { Component } from 'react';
import { Table, Button, Popconfirm, Form, Select, Card } from 'antd';

const SelectOption = Select.Option;

// const EditableContext = React.createContext();
// const EditableRow = ({ form, ...props }) => (
//   <EditableContext.Provider value={form}>
//     <tr {...props} />
//   </EditableContext.Provider>
// );

// const EditableFormRow = Form.create()(EditableRow);

function handleChange(value) {
  console.log(`selected ${value}`);
}

function handleBlur() {
  console.log('blur');
}

function handleFocus() {
  console.log('focus');
}

export default class EditableTable extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        width: '30%',
        editable: true,
        render: () => (
          <UserSelect />
        ),
      },
      {
        title: '权限',
        dataIndex: 'power',
        render: () => (
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="选择权限"
            optionFilterProp="children"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            <SelectOption value="Owner">Owner</SelectOption>
            <SelectOption value="管理员">管理员</SelectOption>
            <SelectOption value="运营">运营</SelectOption>
            <SelectOption value="客服">客服</SelectOption>
          </Select>
        ),
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <a href="javascript:;">Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];

    this.state = {
      dataSource: [
        {
          key: '0',
          name: (
            <UserSelect />
          ),
          power: (
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="选择权限"
              optionFilterProp="children"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              <SelectOption value="Owner">Owner</SelectOption>
              <SelectOption value="管理员">管理员</SelectOption>
              <SelectOption value="运营">运营</SelectOption>
              <SelectOption value="客服">客服</SelectOption>
            </Select>
          ),
          operation: 'delete',
        },
      ],
      count: 1,
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleDelete (key) {
    console.log('delete');
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  }

  handleAdd () {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      power: 32,
      operation: `London, Park Lane no. ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }

  handleSave (row) {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  }

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div className="table">
        <Card title="成员信息" className="card">
          <Button className="button"
            onClick={this.handleAdd}
            type="primary"
          >
            添加
          </Button>
          <Table
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={columns}
          />
        </Card>
      </div>
    );
  }
}