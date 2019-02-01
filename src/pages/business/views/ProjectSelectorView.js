require('./ProjectSelectorView.scss');
import React, { Component } from 'react';
import { Button, Input, Select } from 'antd';


const Option = Select.Option;

export default class ProjectSelectorView extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    this._searchValue = undefined;

    this._handleSelectorChange = this._handleSelectorChange.bind(this);
    this._handleSearchBtnClick = this._handleSearchBtnClick.bind(this);
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  _handleSelectorChange(value) {
    const { onSelectorChange } = this.props;
    if (onSelectorChange) {
      onSelectorChange(value);
    }
  }

  _handleSearchBtnClick(e) {
    e && e.stopPropagation();
    const { onSearchBtnClick } = this.props;
    const value = this._searchValue.input.value;
    if (onSearchBtnClick) {
      onSearchBtnClick(value);
    }
  }

  render() {
    const { selectedKey, dataSource = [] } = this.props;

    return (
      <div className="table-options-container">
        <label className="bz-project-label">业务组</label>
        <Select
          className="bz-project-select"
          defaultValue={selectedKey}
          onChange={this._handleSelectorChange}
        >
          {
            dataSource.map((item, idx) => {
              return <Option key={`item.value-${idx}`} value={item.value}>{item.label}</Option>;
            })
          }
        </Select>
        <label className="bz-keywords-label">关键字</label>
        <Input ref={_ => this._searchValue = _} className="bz-keywords-input" placeholder=""/>
        <Button className="bz-keywords-btn" onClick={this._handleSearchBtnClick}>查询</Button>
      </div>
    );
  }
}
