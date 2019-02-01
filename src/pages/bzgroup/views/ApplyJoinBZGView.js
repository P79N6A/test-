require('./ApplyJoinBZGView.scss');
import React, { Component } from 'react';
import { Select, Modal, Popover, Icon } from 'antd';

const Option = Select.Option;

export default class ApplyJoinBZGView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      groupName: '',
    };

    this.roleType = 'owner';
    this.commentValue = '';

    this._commentView = undefined;

    this._handleApplyBZViewOk = this._handleApplyBZViewOk.bind(this);
    this._handleApplyBZViewCancel = this._handleApplyBZViewCancel.bind(this);
    this._handleSelectorChange = this._handleSelectorChange.bind(this);
    this._handleCommentChange = this._handleCommentChange.bind(this);
  }

  open(data) {
    const { groupName } = data;
    this.commentValue = '';
    this.roleType = 'owner';
    this.bzData = data;
    this.setState({
      groupName: groupName,
      visible: true,
    });
  }

  close() {
    this.setState({
      visible: false,
    });
  }

  getValues() {
    const { groupName } = this.state;
    return {
      bzData: this.bzData,
      groupName,
      roleType: this.roleType,
      commentValue: this.commentValue,
    };
  }

  _handleApplyBZViewOk() {
    if (!this.commentValue) {
      return;
    }

    const { onConfirm, closeOnConfirm } = this.props;
    const { groupName } = this.state;
    if (onConfirm) {
      onConfirm({
        bzData: this.bzData,
        groupName,
        roleType: this.roleType,
        commentValue: this.commentValue,
      });
    }
    if (closeOnConfirm) {
      this.close();
    }
  }

  _handleApplyBZViewCancel() {
    this.close();
  }

  _handleSelectorChange(value) {
    this.roleType = value;
  }

  _handleCommentChange() {
    this.commentValue = this._commentView.value;
  }

  render() {
    const { visible, groupName } = this.state;
    const roleTypes = [
      {
        label: '项目owner',
        value: 'owner',
      },
      {
        label: '项目管理员',
        value: 'master',
      },
      {
        label: '项目成员',
        value: 'member',
      },
    ];
    const selectedKey = 'owner';
    const roleTypeTip = (
      <div style={{ fontSize: 12 }}>
        <div>项目owner：最高操作权限，负责业务内操作工单审批</div>
        <div>项目管理员：查看该项目下风控列表，权限管理，操作需owner审批</div>
        <div>项目成员：查看该项目下风控列表</div>
      </div>
    );
    return (
      <Modal
        title="申请加入业务组"
        visible={visible}
        maskClosable={false}
        okText="确认"
        cancelText="取消"
        centered
        destroyOnClose
        closable={false}
        onOk={this._handleApplyBZViewOk}
        onCancel={this._handleApplyBZViewCancel}
      >
        <div className="apply-join-bz-container">
          <div className="bz-item">
            <div className="bz-item-label">
              <span className="item-import">*</span>
              <span className="item-key">业务组名称</span>
            </div>
            <span className="bz-item-value">{groupName}</span>
          </div>
          <div className="bz-item">
            <div className="bz-item-label v-top">
              <span className="item-import">*</span>
              <span className="item-key">角色类型</span>
            </div>
            <div className="bz-item-value">
              <Select
                className="bz-item-select"
                defaultValue={selectedKey}
                onChange={this._handleSelectorChange}
              >
                {
                  roleTypes.map((item, idx) => {
                    return <Option key={idx} value={item.value}>{item.label}</Option>;
                  })
                }
              </Select>
              <Popover
                className="role-tips"
                trigger="hover"
                content={roleTypeTip}
                placement="right"
              >
                <Icon type="info-circle" />
              </Popover>
            </div>
          </div>
          <div className="bz-item">
            <div className="bz-item-label v-top">
              <span className="item-import">*</span>
              <span className="item-key">备注</span>
            </div>
            <div className="bz-item-value">
              <textarea
                className="bz-item-comment"
                ref={_ => this._commentView = _}
                onChange={this._handleCommentChange}
              />
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
