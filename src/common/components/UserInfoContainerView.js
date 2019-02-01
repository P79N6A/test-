require('./UserInfoContainerView.scss');
import React, { Component } from 'react';

export default class BZUserInfoView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
    };

    this._handleCancel = this._handleCancel.bind(this);
    this._handleEdit = this._handleEdit.bind(this);
  }

  _handleEdit() {
    const { onStartEdit } = this.props;
    this.setState({
      isEditing: true,
    });
    if (onStartEdit) {
      onStartEdit();
    }
  }

  _handleCancel() {
    const { onCancelEdit } = this.props;
    this.setState({
      isEditing: false,
    });
    if (onCancelEdit) {
      onCancelEdit();
    }
  }

  setEditState(state) {
    this.setState({
      isEditing: state,
    });
  }

  render() {
    const { isEditing } = this.state;
    const {
      hideEditBtn,
      headerText,
      subHeader,
    } = this.props;

    let editHeaderEle;
    if (isEditing) {
      editHeaderEle = <a onClick={this._handleCancel} className="u-m-cancel-btn" href="javascript:;">取消</a>;
    } else {
      editHeaderEle = <a onClick={this._handleEdit} className="u-m-edit-btn" href="javascript:;">编辑</a>;
    }
    if (hideEditBtn) {
      editHeaderEle = undefined;
    }
    return (
      <div className="user-magagement-container">
        <div className="user-magagement-header">
          <div className="u-m-title">
            <span className="u-m-title-label">{headerText}</span>
            <div className="u-m-title-info">{subHeader}</div>
          </div>
          <div className="u-m-options">
            {editHeaderEle}
          </div>
        </div>
        <div className="user-magagement-body">
          {this.props.children}
        </div>
      </div>
    );
  }
}
