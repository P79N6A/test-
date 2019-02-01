require('./BZGInfoView.scss');
import React, { Component } from 'react';
import { Input } from 'antd';

const { TextArea } = Input;
const TITLE_MAX_LEN = 20;
const DESC_MAX_LEN = 100;
export default class BZGInfoView extends Component {
  constructor(props) {
    super(props);

    const {
      title = '',
      bzName = '',
      bzDesc = '',
    } = this.props;

    this.state = {
      title,
      titleError: false,
      bzName,
      bzNameError: false,
      bzDesc,
      bzDescError: false,
    };

    this._handTitleChange = this._handTitleChange.bind(this);
    this._handBZNameChange = this._handBZNameChange.bind(this);
    this._handleBZDescChange = this._handleBZDescChange.bind(this);

  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const state = prevState;
    const stateKey = [
      'title',
      'bzName',
      'bzDesc',
    ];

    if (
      nextProps['title'] !== prevState['title'] ||
      nextProps['bzName'] !== prevState['bzName'] ||
      nextProps['bzDesc'] !== prevState['bzDesc'] ||
      0
    ) {
      stateKey.forEach(k => {
        if (typeof nextProps[k] !== 'undefined') {
          state[k] = nextProps[k];
        }
      });
    }

    return state;
  }
  _handTitleChange(e) {
    e && e.preventDefault();
    const value = e && e.target && e.target.value;

    const { onTitleChange, title } = this.props;

    this.setState(() => ({
      titleError: value.length === 0 || value.length > TITLE_MAX_LEN,
    }));

    if (typeof title === 'undefined') {
      this.setState({
        title: value,
      });
    }

    if (onTitleChange) {
      onTitleChange(value);
    }
  }

  _handBZNameChange(e) {
    e && e.preventDefault();
    const value = e && e.target && e.target.value;

    const { onBZNameChange, bzName } = this.props;

    this.setState(() => ({
      bzNameError: value.length === 0 || value.length > TITLE_MAX_LEN,
    }));

    if (typeof bzName === 'undefined') {
      this.setState({
        bzName: value,
      });
    }

    if (onBZNameChange) {
      onBZNameChange(value);
    }
  }

  _handleBZDescChange(e) {
    e && e.preventDefault();
    const value = e && e.target && e.target.value;

    this.setState(() => ({
      bzDescError: value.length === 0 || value.length > DESC_MAX_LEN,
    }));

    const { onBZDescChange, bzDesc } = this.props;

    if (typeof bzDesc === 'undefined') {
      this.setState({
        bzDesc: value,
      });
    }

    if (onBZDescChange) {
      onBZDescChange(value);
    }
  }


  render() {
    let {
      title,
      titleError,
      bzName,
      bzNameError,
      bzDesc,
      bzDescError,
    } = this.state;

    return (
      <div className="bzapp-info-view-container">
        <div className="bz-item">
          <span className="item-import-tag">*</span>
          <label className="item-label">业务组标题</label>
          <div className="item-value-container">
            <Input
              className={`item-input${titleError ? ' error' : ''}`}
              value={title}
              onChange={this._handTitleChange}
            />
            {
              title.length > TITLE_MAX_LEN && <div className="item-error-tip">标题不能超过20字符</div>
            }
          </div>
        </div>
        <div className="bz-item">
          <span className="item-import-tag">*</span>
          <label className="item-label">英文简称</label>
          <div className="item-value-container">
            <Input
              className={`item-input${bzNameError ? ' error' : ''}`}
              placeholder="由字母和下划线组成，不超过20字符"
              value={bzName}
              onChange={this._handBZNameChange}
            />
            {
              bzName.length > TITLE_MAX_LEN && <div className="item-error-tip">业务名称不能超过20字符</div>
            }
          </div>
        </div>
        <div className="bz-item">
          <span className="item-import-tag">*</span>
          <label className="item-label">业务描述</label>
          <div className="item-value-container">
            <TextArea
              className={`item-textarea${bzDescError ? ' error' : ''}`}
              rows={3}
              value={bzDesc}
              onChange={this._handleBZDescChange}
            />
            {
              bzDesc.length > DESC_MAX_LEN && <div className="item-error-tip">业务描述不能超过100字符</div>
            }
          </div>
        </div>
      </div>
    );
  }
}