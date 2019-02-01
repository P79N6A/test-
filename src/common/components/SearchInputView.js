require('./SearchInputView.scss');
import React, { PureComponent } from 'react';
import { Button, Input } from 'antd';

export default class SearchInputView extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {

    };

    this._searchValue = undefined;

    this._handleSearchBtnClick = this._handleSearchBtnClick.bind(this);
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
    const {
      placeholder = '',
      label,
      buttonText = '查询',
      inputWidth = 200,
      className,
      style,
    } = this.props;
    return (
      <div className={`search-input-view-container${className ? ' ' + className : ''}`} style={style}>
        {
          label ? <label className="search-input-label">{label}</label> : undefined
        }
        <Input ref={_ => this._searchValue = _} className="search-input-input" style={{ width: inputWidth }} placeholder={placeholder}/>
        <Button className="search-input-btn" onClick={this._handleSearchBtnClick}>{buttonText}</Button>
      </div>
    );
  }
}
