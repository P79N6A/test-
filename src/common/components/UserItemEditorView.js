require('./UserItemEditorView.scss');
import React, { Component } from 'react';
import { Select, Icon } from 'antd';
const { List, Map, is } = require('immutable');

const { Option } = Select;

export default class UserItemEditorView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItems: this.props.defaultSelected,
      dataSource: this.props.dataSource,
    };

    this._handleSelectChange = this._handleSelectChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!is(Map(prevState.dataSource), Map(nextProps.dataSource))) {
      return {
        dataSource: nextProps.dataSource,
      };
    }
    return null;
  }

  getSelected() {
    return this.state.selectedItems;
  }

  getDataSource() {
    return this.state.dataSource;
  }

  setSelected(selected = []) {
    const { selectedItems } = this.state;
    if (is(List(selected), List(selectedItems))) {
      return;
    }
    this.setState(() => ({
      selectedItems: selected,
    }));
  }

  _handleSelectChange(selectedItems) {
    this.setState({ selectedItems });
    const { onSelected } = this.props;
    if (onSelected) {
      onSelected(selectedItems);
    }
  }

  render() {
    const { selectedItems = [], dataSource = [] } = this.state;
    const {
      necessary,
      label,
      selectorWidth = 400,
      tipInfo,
      disabled,
    } = this.props;

    return (
      <div className="user-item-edit-container">
        <div className="user-item-edit-label">
          <span className="item-import">{necessary ? '*' : ''}</span>
          <span className="item-key">{label}</span>
        </div>
        <div className="user-item-edit-value">
          <Select
            mode="multiple"
            value={selectedItems}
            onChange={this._handleSelectChange}
            style={{ width: selectorWidth }}
            disabled={disabled}
          >
            {
              dataSource.map((item, idx) => (
                <Option key={idx} value={item.userName}>
                  {item.nikeName}
                </Option>
              ))
            }
          </Select>
        </div>
        {
          tipInfo ? (
            <div className="user-item-edit-info">
              <Icon type="info-circle" style={{ marginRight: 5 }} />
              {tipInfo}
            </div>
          ) : undefined
        }

      </div>
    );
  }
}
