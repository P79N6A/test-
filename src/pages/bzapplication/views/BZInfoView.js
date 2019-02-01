require('./BZInfoView.scss');
import React, { Component } from 'react';
import { Input, Select, Checkbox, Icon } from 'antd';
import { is as Is, List } from 'immutable';

const { TextArea } = Input;
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;
const TITLE_MAX_LEN = 20;
const DESC_MAX_LEN = 100;

export default class BZInfoView extends Component {
  constructor(props) {
    super(props);

    const {
      title = '',
      bzName = '',
      bzDesc = '',
      maxQps = '',
      avgQps = '',
      emailcc = '',

      selectedBZGroup = '',
      bzGroupDataSource = [],

      selectedSence = '',
      senceDataSource = [],

      selectedMode = '',
      modeDataSource = [],

      selectedServers = [],
      serversDataSource = [],
    } = this.props;

    this.state = {
      title,
      titleError: false,
      bzName,
      bzNameError: false,
      bzDesc,
      bzDescError: false,
      maxQps,
      maxQpsError: false,
      avgQps,
      avgQpsError: false,
      emailcc,

      selectedBZGroup,
      bzGroupDataSource,

      selectedSence,
      senceDataSource,

      selectedMode,
      modeDataSource,

      selectedServers,
      serversDataSource,
      selectedServersError: false,
    };

    this._handTitleChange = this._handTitleChange.bind(this);
    this._handBZNameChange = this._handBZNameChange.bind(this);
    this._handleBZDescChange = this._handleBZDescChange.bind(this);
    this._handleMaxQpsChange = this._handleMaxQpsChange.bind(this);
    this._handleAvgQpsChange = this._handleAvgQpsChange.bind(this);
    this._handleEmailccQpsChange = this._handleEmailccQpsChange.bind(this);

    this._handleBZGChange = this._handleBZGChange.bind(this);
    this._handleSenceChange = this._handleSenceChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleServersChange = this._handleServersChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const state = prevState;
    const stateKeys = [
      'title',
      'bzName',
      'bzDesc',
      'maxQps',
      'avgQps',
      'emailcc',

      'selectedBZGroup',
      'bzGroupDataSource',

      'selectedSence',
      'senceDataSource',

      'selectedMode',
      'modeDataSource',

      'selectedServers',
      'serversDataSource',
    ];

    if (
      nextProps['title'] !== prevState['title'] ||
      nextProps['bzName'] !== prevState['bzName'] ||
      nextProps['bzDesc'] !== prevState['bzDesc'] ||
      nextProps['maxQps'] !== prevState['maxQps'] ||
      nextProps['avgQps'] !== prevState['avgQps'] ||
      nextProps['emailcc'] !== prevState['emailcc'] ||

      nextProps['selectedBZGroup'] !== prevState['selectedBZGroup'] ||
      !Is(List(nextProps['bzGroupDataSource']), List(prevState['bzGroupDataSource'])) ||

      nextProps['selectedSence'] !== prevState['selectedSence'] ||
      !Is(List(nextProps['senceDataSource']), List(prevState['senceDataSource'])) ||

      nextProps['selectedMode'] !== prevState['selectedMode'] ||
      !Is(List(nextProps['modeDataSource']), List(prevState['modeDataSource'])) ||

      !Is(List(nextProps['selectedServers']), List(prevState['selectedServers'])) ||
      !Is(List(nextProps['serversDataSource']), List(prevState['serversDataSource'])) ||
      0
    ) {
      stateKeys.forEach(k => {
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

  _handleMaxQpsChange(e) {
    e && e.preventDefault();
    const value = e && e.target && e.target.value;

    this.setState(() => ({
      maxQpsError: value.length === 0,
    }));

    const { onMaxQpsChange, maxQps } = this.props;

    if (typeof maxQps === 'undefined') {
      this.setState({
        maxQps: value,
      });
    }

    if (onMaxQpsChange) {
      onMaxQpsChange(value);
    }
  }

  _handleAvgQpsChange(e) {
    e && e.preventDefault();
    const value = e && e.target && e.target.value;

    this.setState(() => ({
      avgQpsError: value.length === 0,
    }));

    const { onAvgQpsChange, avgQps } = this.props;

    if (typeof avgQps === 'undefined') {
      this.setState({
        avgQps: value,
      });
    }

    if (onAvgQpsChange) {
      onAvgQpsChange(value);
    }
  }

  _handleEmailccQpsChange(e) {
    e && e.preventDefault();
    const value = e && e.target && e.target.value;

    const { onEmailccChange, emailcc } = this.props;

    if (typeof emailcc === 'undefined') {
      this.setState({
        emailcc: value,
      });
    }

    if (onEmailccChange) {
      onEmailccChange(value);
    }
  }



  _handleBZGChange(value) {
    const { onBZGChange, selectedBZGroup } = this.props;

    if (typeof selectedBZGroup === 'undefined') {
      this.setState({
        selectedBZGroup: value,
      });
    }

    if (onBZGChange) {
      onBZGChange(value);
    }
  }

  _handleSenceChange(value) {
    const { onSenceChange, selectedSence } = this.props;

    if (typeof selectedSence === 'undefined') {
      this.setState({
        selectedSence: value,
      });
    }

    if (onSenceChange) {
      onSenceChange(value);
    }
  }

  _handleModeChange(value) {
    const { onModeChange, selectedMode } = this.props;

    if (typeof selectedMode === 'undefined') {
      this.setState({
        selectedMode: value,
      });
    }

    if (onModeChange) {
      onModeChange(value);
    }
  }

  _handleServersChange(value) {
    const { onServersSelected, selectedServers } = this.props;

    this.setState(() => ({
      selectedServersError: value.length === 0,
    }));

    if (typeof selectedServers === 'undefined') {
      this.setState({
        selectedServers: value,
      });
    }

    if (onServersSelected) {
      onServersSelected(value);
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
      maxQps,
      maxQpsError,
      avgQps,
      avgQpsError,
      emailcc,

      selectedBZGroup,
      bzGroupDataSource,

      selectedSence,
      senceDataSource,

      selectedMode,
      modeDataSource,

      selectedServers,
      serversDataSource,
      selectedServersError,
    } = this.state;

    if (!selectedBZGroup) {
      selectedBZGroup = bzGroupDataSource[0] && bzGroupDataSource[0].groupId;
    }

    if (!selectedSence) {
      selectedSence = senceDataSource[0] && senceDataSource[0].key;
    }

    if (!selectedMode) {
      selectedMode = modeDataSource[0] && modeDataSource[0].key;
    }

    return (
      <div className="bzapp-info-view-container">
        <div className="bz-item">
          <span className="item-import-tag">*</span>
          <label className="item-label">标题</label>
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
          <label className="item-label">业务名称</label>
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
        <div className="bz-item">
          <span className="item-import-tag">*</span>
          <label className="item-label">所属业务组</label>
          <div className="item-value-container">
            <Select
              style={{ width: '100%' }}
              onChange={this._handleBZGChange}
              value={selectedBZGroup}
            >
              {
                bzGroupDataSource.map(bzg => (
                  <Option key={bzg.groupId} value={bzg.groupId}>
                    {bzg.groupName}
                  </Option>
                ))
              }
            </Select>
            <div className="item-success-tip">
              <Icon type="sync"/>
              <span className="tip-info">刷新</span>
            </div>
          </div>
        </div>
        <div className="bz-item">
          <span className="item-import-tag">*</span>
          <label className="item-label">场景选择</label>
          <div className="item-value-container">
            <Select
              onChange={this._handleSenceChange}
              value={selectedSence}
              style={{ width: '100%' }}
            >
              {
                senceDataSource.map(sc => (
                  <Option key={sc.key} value={sc.key}>
                    {sc.label}
                  </Option>
                ))
              }
            </Select>
            <div className="item-info-tips">
              场景说明详情见
              <a>反垃圾防护说明</a>
            </div>
          </div>
        </div>
        <div className="bz-item">
          <span className="item-import-tag">*</span>
          <label className="item-label">模式选择</label>
          <div className="item-value-container">
            <Select
              onModeChange={this._handleModeChange}
              value={selectedMode}
              disabled
              style={{ width: '100%' }}
            >
              {
                modeDataSource.map(sc => (
                  <Option key={sc.key} value={sc.key}>
                    {sc.label}
                  </Option>
                ))
              }
            </Select>
          </div>
        </div>
        <div className="bz-item">
          <span className="item-import-tag">*</span>
          <label className="item-label">最大QPS</label>
          <div className="item-value-container">
            <Input
              className={`item-input${maxQpsError ? ' error' : ''}`}
              value={maxQps}
              onChange={this._handleMaxQpsChange}
            />
          </div>
        </div>
        <div className="bz-item">
          <span className="item-import-tag">*</span>
          <label className="item-label">平均QPS</label>
          <div className="item-value-container">
            <Input
              className={`item-input${avgQpsError ? ' error' : ''}`}
              value={avgQps}
              onChange={this._handleAvgQpsChange}
            />
          </div>
        </div>
        <div className="bz-item">
          <span className="item-import-tag">*</span>
          <label className="item-label">多机房部署</label>
          <div className="item-value-container">
            <CheckboxGroup
              className="item-checkbox-group"
              value={selectedServers}
              onChange={this._handleServersChange}
            >
              {
                serversDataSource.map(s => (
                  <Checkbox
                    key={s.key}
                    className={`item-checkbox${selectedServersError ? ' error' : ''}`}
                    value={s.key}
                  >
                    {s.label}
                  </Checkbox>
                ))
              }
            </CheckboxGroup>
          </div>
        </div>
        <div className="bz-item">
          <span className="item-import-tag"></span>
          <label className="item-label">邮件抄送</label>
          <div className="item-value-container">
            <Input
              className="item-input"
              placeholder="请输入邮箱前缀，若多个则用英文逗号分隔"
              value={emailcc}
              onChange={this._handleEmailccQpsChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
